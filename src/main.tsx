import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import NostrProvider from "./nostr/NostrProvider";
import App from "./App";
import { RelayList } from "./nostr/constants";
import Debugger from "./debugger/Debugger";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NostrProvider relays={RelayList}>
      <App />
      <Debugger />
    </NostrProvider>
  </React.StrictMode>,
);
