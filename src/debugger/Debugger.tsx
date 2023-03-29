import { Event, Kind } from "nostr-tools";
import { useState, useEffect } from "react";
import styled from "styled-components";

const FAB = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid purple;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  font-size: 0.75rem;

  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 40px;
  width: 40px;
`;

const Container = styled.div`
  border: 1px solid purple;
  z-index: 2;

  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  height: calc(100vh - 90px);
  width: 300px;
`;

import { useNostr } from "../nostr/NostrProvider";

export default function Debugger() {
  const nostr = useNostr();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log("SETTING UP SUBSCRIPTION");
    nostr.subscribe({ kinds: [Kind.Text] }).subscribe(evt => {
      setEvents(prev => [...prev, evt]);
    });
  }, [nostr]);

  return (
    <>
      <FAB onClick={() => setOpen(!open)}>Nostr</FAB>
      {open && <Container></Container>}
    </>
  );
}
