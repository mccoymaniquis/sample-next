import CryptoJS from "crypto-js";

export function encryptPassword(plainText: string): string {
  // eslint-disable-next-line node/no-process-env
  const secret = process.env.NEXT_PUBLIC_APP_SECRET;
  if (!secret) {
    throw new Error("NEXT_PUBLIC_APP_SECRET is not defined in environment variables.");
  }
  return CryptoJS.AES.encrypt(plainText, secret).toString();
}
