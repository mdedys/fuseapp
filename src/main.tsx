import React from "react";
import ReactDOM from "react-dom/client";

import { createGlobalStyle } from "~/esm/StyledComponents.js";

import AuthProvider from "./contexts/Auth.js";
import Router from "./Router.js";

const Style = createGlobalStyle`
  html {
    font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
    width: 100%;
  }
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Style />
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
);
