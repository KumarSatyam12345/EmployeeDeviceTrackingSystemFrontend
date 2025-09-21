import ReactDOM from "react-dom/client";
import App from "./App";

// Removed React.StrictMode to stop double API calls in development
ReactDOM.createRoot(document.getElementById("root")!).render(
    <App />
);
