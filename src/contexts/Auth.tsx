import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useState, useContext, createContext, PropsWithChildren } from "react";

import CredentialStore, { Credentials } from "../credentials/CredentialStore.js";

type AuthContext = {
  creds: Credentials | null;
  isAuthenticated: boolean;
  api: {
    unlock(password: string): void;
    create(password: string): void;
  };
};

const NOT_SETUP = () => {
  throw new Error("Context not configured");
};

const Context = createContext<AuthContext>({
  creds: null,
  isAuthenticated: false,
  api: {
    unlock: NOT_SETUP,
    create: NOT_SETUP,
  },
});

export default function AuthProvider(props: PropsWithChildren) {
  const [store] = useState(new CredentialStore());
  const [creds, setCreds] = useState<Credentials | null>(null);

  const unlock = (password: string) => {
    try {
      const _creds = store.unlock(password);
      setCreds(_creds);
      return true;
    } catch {
      return false;
    }
  };

  const create = (password: string) => {
    const privkey = generatePrivateKey();
    const pubkey = getPublicKey(privkey);
    store.save(password, pubkey, privkey);
    setCreds({ pubkey, privkey });
  };

  return (
    <Context.Provider
      value={{
        creds,
        isAuthenticated: Boolean(creds),
        api: { unlock, create },
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useAuth() {
  return useContext(Context);
}
