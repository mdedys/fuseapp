import { useState, useContext, createContext, PropsWithChildren } from "react";

import CredentialStore, { Credentials } from "~/stores/credentials/CredentialStore.js";

type AuthContext = {
  accountExists: boolean;
  creds: Credentials | null;
  isAuthenticated: boolean;
  api: {
    unlock(password: string): void;
    save(password: string, relay: string, redentials: Credentials): void;
  };
};

const NOT_SETUP = () => {
  throw new Error("Context not configured");
};

const Context = createContext<AuthContext>({
  accountExists: false,
  creds: null,
  isAuthenticated: false,
  api: {
    unlock: NOT_SETUP,
    save: NOT_SETUP,
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

  const save = (password: string, relay: string, creds: Credentials) => {
    store.save(password, relay, creds.pubkey, creds.privkey);
    setCreds(creds);
  };

  return (
    <Context.Provider
      value={{
        accountExists: store.accountExists(),
        creds,
        isAuthenticated: Boolean(creds),
        api: { unlock, save },
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useAuth() {
  return useContext(Context);
}
