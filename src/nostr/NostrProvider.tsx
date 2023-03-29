import {
  getEventHash,
  Filter,
  type Event,
  generatePrivateKey,
  getPublicKey,
  signEvent,
  UnsignedEvent,
} from "nostr-tools";
import { createContext, PropsWithChildren, useState, useEffect, useContext } from "react";
import { merge, Observable, Observer } from "rxjs";

import RelayManager from "./RelayManager";

type NostrContextValue = {
  pubkey: string;
  ready: boolean;
  subscribe(filter?: Filter): Observable<Event>;
  publish(event: Omit<UnsignedEvent, "pubkey" | "created_at">): void;
};

const NotImplemented = () => {
  throw new Error("Not Implemented");
};

const Context = createContext<NostrContextValue>({
  pubkey: "",
  ready: false,
  subscribe: NotImplemented,
  publish: NotImplemented,
});

export interface NostrProviderProps {
  relays: string[];
}

export default function NostrProvider(props: PropsWithChildren<NostrProviderProps>) {
  const [privkey] = useState<string>("7c29ce2183e191a39751bf3ef539d072d2343ce044d5de809cfeef7f20a48e9f");
  const [pubkey] = useState<string>("a549eb6f2c5579f8e6db18d6f1e390891779e8f939d5308ceac36fe8c02b50b1");

  const [ready, setReady] = useState(false);
  const [manager] = useState<RelayManager>(new RelayManager(props.relays));

  const subscribe = (filter: Filter = {}) => {
    return manager.subscribe(filter);
  };

  const publish = (evt: Omit<UnsignedEvent, "pubkey" | "created_at">) => {
    const partial: UnsignedEvent = { ...evt, pubkey: pubkey, created_at: Math.floor(Date.now() / 1000) };
    const event: Event = { ...partial, id: getEventHash(partial), sig: signEvent(partial, privkey) };
    manager.publish(event);
  };

  return <Context.Provider value={{ pubkey, ready, publish, subscribe }}>{props.children}</Context.Provider>;
}

export function useNostr() {
  return useContext(Context);
}
