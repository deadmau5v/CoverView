import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n"; // 导入 i18n 配置

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
