import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: "https://dev-yohelt72e38t5w40.us.auth0.com/api/v2/",
        // scope: "read:current_user openid profile email update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
