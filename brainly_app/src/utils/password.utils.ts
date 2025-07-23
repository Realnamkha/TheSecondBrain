import bycrypt from "bcrypt";

export async function hashPassword(plainPassword: string): Promise<string> {
  const saltrounds = 10;
  return await bycrypt.hash(plainPassword, saltrounds);
}
export async function comparePasswords(
  plain: string,
  hash: string
): Promise<boolean> {
  return await bycrypt.compare(plain, hash);
}
export function generateRandomString(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
