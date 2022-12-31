import { type Event } from "nostr-tools";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext, PropsWithChildren } from "react";
import Relay from "./Relay.js";
import RelayList from "./RelayList.js";

type NostrContextValue = {
  ready: boolean;
  send(event: Event): void;
};

const NOT_SETUP = () => {
  throw new Error("Context is not configured");
};

const Context = createContext<NostrContextValue>({
  ready: false,
  send: NOT_SETUP,
});

export default function NostrProvider(props: PropsWithChildren) {
  const [relays, setRelays] = useState<Relay[]>([]);
  const [ready, setReady] = useState(false);

  const send = (event: Event) => {
    relays.forEach(relay => {
      relay.send(event);
    });
  };

  useEffect(() => {
    const _relays = RelayList.map(url => {
      const relay = new Relay(url);
      return relay;
    });
    setReady(true);
    setRelays(_relays);
    return () => {
      relays.forEach(relay => relay.disconnect());
    };
  }, []);

  return <Context.Provider value={{ ready, send }}>{props.children}</Context.Provider>;
}

export function useNostr() {
  return useContext(Context);
}
