import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SetupPage from "./pages/setup-page/SetupPage";
import QuizPage from "./pages/quiz-page/QuizPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SetupPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
