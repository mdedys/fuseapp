import { serializeEvent, type Event, Kind, type Filter } from "nostr-tools";
import { Observer } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { v4 as uuid } from "uuid";

enum RelayEvent {
  Event = "EVENT",
  Notice = "NOTICE",
}

enum RequestType {
  Event = "EVENT",
  Req = "REQ",
  Close = "CLOSE",
}

class Relay {
  private url: string;
  private socket: WebSocketSubject<Event>;

  constructor(url: string) {
    this.url = url;
    this.socket = webSocket({
      url: `wss://${this.url}`,
      // serializer: evt => serializeEvent(evt),
    });
  }

  subscribe(filter: Filter = {}) {
    const subID = uuid();
    return this.socket.multiplex(
      () => [RequestType.Req, subID, filter],
      () => [RequestType.Close, subID],
      evt => true,
    );
  }

  send(event: Event) {
    this.socket.next(event);
  }

  disconnect() {
    this.socket?.complete();
  }
}

export default Relay;
