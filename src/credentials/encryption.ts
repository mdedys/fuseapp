import { AES, enc } from "crypto-js";

const TEST_DATA = "Irrelevant data for password verification";

export const generateSalt = () => {
  const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));
  /* eslint-disable-next-line */
  const salt = String.fromCharCode.apply(null, array as any);
  return salt;
};

export const encrypt = (data: unknown, password: string, salt: string) =>
  AES.encrypt(JSON.stringify(data), password + salt).toString();

export const decrypt = <T = unknown>(data: string, password: string, salt: string) => {
  const decrypted = AES.decrypt(data, password + salt);
  return JSON.parse(decrypted.toString(enc.Utf8)) as T;
};

export const createCipher = (password: string, salt: string) => encrypt(TEST_DATA, password, salt);

export const testCipher = (cipher: string, password: string, salt: string) => {
  try {
    const decrypted = decrypt(cipher, password, salt);
    return decrypted === TEST_DATA;
  } catch (error) {
    return false;
  }
};
