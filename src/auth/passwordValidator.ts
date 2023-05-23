import { createHash } from 'crypto';

export function verifyPassword(hash: string, password: string): boolean {
  const recreatedHash = createHash('sha256')
    .update(password + (process.env.SALT || "testSalt"))
    .digest('hex');
  return recreatedHash === hash;
}