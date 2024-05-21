import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/home-page/HomePage";
import SetupPage from "./pages/setup-page/SetupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
