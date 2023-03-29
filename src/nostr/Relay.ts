import { serializeEvent, type Event, Kind, type Filter } from "nostr-tools";
import { Observer } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { v4 as uuid } from "uuid";

enum RequestType {
  Event = "EVENT",
  Req = "REQ",
  Close = "CLOSE",
  Notice = "NOTICE",
}

type RelayEventMessage = [RequestType.Event, string, Event];
type RelayNoticeMessage = [RequestType.Notice, string];
type ClientEventMessage = [RequestType.Event, Event];
type ClientReqMessage = [RequestType.Req, string, Filter];
type ClientCloseMessage = [RequestType.Close, string];

class Relay {
  private url: string;
  private socket: WebSocketSubject<Event>;

  constructor(url: string) {
    this.url = url;
    this.socket = webSocket({
      url: `ws://${this.url}`,
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
    // @ts-ignore determine how to use serializer
    this.socket.next([RequestType.Event, event]);
  }

  disconnect() {
    this.socket.complete();
  }
}

export default Relay;
