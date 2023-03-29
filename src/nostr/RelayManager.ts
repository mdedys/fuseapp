import { Filter, type Event } from "nostr-tools";
import { merge, interval, distinct, mergeMap, Observable } from "rxjs";

import Relay from "./Relay";

const a = interval(52000);

class RelayManager {
  private relays: Relay[];

  // Internal collection of events processed
  private events: Event[] = [];
  private seen: Record<string, boolean> = {};

  constructor(srcs: string[]) {
    this.relays = srcs.map(src => new Relay(src));
  }

  subscribe(filter: Filter): Observable<Event> {
    const stream = merge(...this.relays.map(r => r.subscribe(filter)));
    return stream.pipe(
      distinct(e => {
        return e.id;
      }),
    );
  }

  publish(event: Event) {
    this.relays.forEach(r => r.send(event));
  }
}

export default RelayManager;
