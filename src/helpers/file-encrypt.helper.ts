import crypto from 'crypto';

export function getCipherKey(password: string): Buffer {
  return crypto.createHash('sha256').update(password).digest();
}
