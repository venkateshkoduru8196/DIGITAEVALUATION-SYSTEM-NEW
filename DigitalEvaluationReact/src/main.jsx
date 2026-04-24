



import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="347020397859-jblncmg03j3sffj3vias2ujrk534s546.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

