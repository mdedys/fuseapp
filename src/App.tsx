import { useNostr } from "./nostr/NostrProvider";

function App() {
  const nostr = useNostr();

  return (
    <div className="container">
      <button
        onClick={() => {
          nostr.publish({
            kind: 1,
            content: "this is going to work",
            tags: [],
          });
        }}
      >
        send
      </button>
    </div>
  );
}

export default App;
