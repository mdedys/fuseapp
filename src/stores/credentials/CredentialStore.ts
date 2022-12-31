import * as encryption from "./encryption.js";
import LoadStorage from "./LocalStorage.js";

const KEY = "fuseapp";

type StoredCredentials = {
  data: string;
  cipher: string;
  salt: string;
};

export type Credentials = {
  pubkey: string;
  privkey: string;
};

class CredentialStore {
  private storage = LoadStorage("local");

  // Stored in local storage
  private creds: Credentials = { pubkey: "", privkey: "" };
  private encrypted = "";
  private cipher = "";
  private salt = "";

  constructor() {
    const data = this.storage.get<StoredCredentials>(KEY);
    if (!data) return;
    this.cipher = data.cipher;
    this.salt = data.salt;
    this.encrypted = data.data;
  }

  accountExists() {
    return this.encrypted.length > 0;
  }

  getCreds() {
    return this.creds;
  }

  unlock(password: string): Credentials {
    if (!encryption.testCipher(this.cipher, password, this.salt)) {
      throw new Error("Invalid password");
    }
    try {
      this.creds = encryption.decrypt<Credentials>(this.encrypted, password, this.salt);
      return this.creds;
    } catch (err) {
      throw new Error("Failed to decrypt credentials");
    }
  }

  save(password: string, pubkey: string, privkey: string) {
    const salt = encryption.generateSalt();
    const cipher = encryption.createCipher(password, salt);
    this.salt = salt;
    this.cipher = cipher;
    this.creds = { pubkey, privkey };
    this.encrypted = encryption.encrypt(this.creds, password, salt);
    this.storage.set(KEY, { data: this.encrypted, cipher: this.cipher, salt: this.salt });
  }
}

export default CredentialStore;
