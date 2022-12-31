import { serializeEvent, type Event } from "nostr-tools";
import { tap } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

class Relay {
  private url: string;
  private socket: WebSocketSubject<string> | null = null;

  constructor(url: string) {
    this.url = url;
    this.socket = webSocket({
      url: `wss://${this.url}`,
    });
  }

  subscribe() {
    if (!this.socket) {
      throw new Error("not connected to any socket");
    }
    return this.socket.pipe(tap(data => console.log(data))).subscribe();
  }

  send(event: Event) {
    if (!this.socket) {
      throw new Error("not connected to any socket");
    }
    this.socket.next(serializeEvent(event));
  }

  disconnect() {
    this.socket?.complete();
  }
}

export default Relay;
