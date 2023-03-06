import { Filter, type Event } from "nostr-tools";
import { createContext, PropsWithChildren, useState, useEffect, useContext } from "react";
import { merge, Observable, Observer } from "rxjs";

import RelayManager from "./RelayManager";

type NostrContextValue = {
  ready: boolean;
  subscribe(filter?: Filter): Observable<Event>;
  publish(event: Event): void;
};

const NotImplemented = () => {
  throw new Error("Not Implemented");
};

const Context = createContext<NostrContextValue>({
  ready: false,
  subscribe: NotImplemented,
  publish: NotImplemented,
});

export interface NostrProviderProps {
  relays: string[];
}

export default function NostrProvider(props: PropsWithChildren<NostrProviderProps>) {
  const [ready, setReady] = useState(false);
  const [manager] = useState<RelayManager>(new RelayManager(props.relays));

  const subscribe = (filter: Filter = {}) => {
    return manager.subscribe(filter);
  };

  const publish = (event: Event) => {
    manager.publish(event);
  };

  // useEffect(() => {
  //   const _relays = props.relays.map(url => new Relay(url));
  //   setReady(true);
  //   setRelays(_relays);
  //   return () => {
  //     setReady(false);
  //     _relays.forEach(r => r.disconnect());
  //   };
  // }, [props.relays]);

  return <Context.Provider value={{ ready, publish, subscribe }}>{props.children}</Context.Provider>;
}

export function useNostr() {
  return useContext(Context);
}
