import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DataProvider from "./redux/store";
import axios from "axios";

axios.defaults.baseURL = "https://ltfyr-social-media.onrender.com/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <App />
  </DataProvider>
);
