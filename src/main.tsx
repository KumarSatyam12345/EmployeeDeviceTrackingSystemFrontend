import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DeviceProvider } from "./components/DeviceProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DeviceProvider>
      <App />
    </DeviceProvider>
  </React.StrictMode>
);
