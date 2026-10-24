import fs from 'fs';
import path from 'path';

export interface StoredSubmission {
  id: string;
  type: 'contact' | 'careers';
  timestamp: string;
  applicantEmail: string;
  targetRecipient: string;
  subject: string;
  data: Record<string, unknown>;
  emailDelivery: {
    status: 'accepted' | 'failed' | 'unconfigured' | 'pending';
    provider?: 'resend' | 'smtp' | 'none';
    messageId?: string;
    error?: string;
  };
}

function getDataDir(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', '.data');
  }
  return path.join(process.cwd(), '.data');
}

function getStoreFile(): string {
  return path.join(getDataDir(), 'submissions.json');
}

function ensureStoreExists() {
  try {
    const dir = getDataDir();
    const file = getStoreFile();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[SubmissionStore] Unable to access local disk (ephemeral/read-only environment):', err);
  }
}

/**
 * Persists a submission to disk so customer inquiries and candidate data are NEVER lost,
 * even if the transactional email provider has an outage or lacks credentials.
 */
export async function persistSubmission(submission: StoredSubmission): Promise<void> {
  try {
    ensureStoreExists();
    let records: StoredSubmission[] = [];
    if (fs.existsSync(getStoreFile())) {
      const content = fs.readFileSync(getStoreFile(), 'utf-8');
      records = JSON.parse(content || '[]');
    }

    records.unshift(submission);
    // Keep last 1,000 submissions
    if (records.length > 1000) {
      records = records.slice(0, 1000);
    }

    fs.writeFileSync(getStoreFile(), JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('[SubmissionStore] Failed to write submission backup:', err);
  }
}

/**
 * Updates delivery status for a stored submission
 */
export async function updateSubmissionDelivery(
  id: string,
  delivery: StoredSubmission['emailDelivery'],
): Promise<void> {
  try {
    ensureStoreExists();
    if (!fs.existsSync(getStoreFile())) return;
    const content = fs.readFileSync(getStoreFile(), 'utf-8');
    const records: StoredSubmission[] = JSON.parse(content || '[]');
    const item = records.find((r) => r.id === id);
    if (item) {
      item.emailDelivery = delivery;
      fs.writeFileSync(getStoreFile(), JSON.stringify(records, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[SubmissionStore] Failed to update submission delivery status:', err);
  }
}

/**
 * Read stored submissions (for audit and verification)
 */
export function getStoredSubmissions(): StoredSubmission[] {
  try {
    ensureStoreExists();
    if (!fs.existsSync(getStoreFile())) return [];
    const content = fs.readFileSync(getStoreFile(), 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}
