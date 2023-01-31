import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-widgets/styles.css";

axios.defaults.baseURL = "https://localhost:44326/ScoutingReports";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
