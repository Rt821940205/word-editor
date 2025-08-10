// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import WordEditorPage from "./pages/WordEditorPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/word-editor/:id" element={<WordEditorPage />} />
      </Routes>
    </Router>
  );
};

export default App;