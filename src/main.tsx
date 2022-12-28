import React from "react";
import ReactDOM from "react-dom/client";

import AuthProvider from "./contexts/Auth.js";
import Router from "./Router.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
);
