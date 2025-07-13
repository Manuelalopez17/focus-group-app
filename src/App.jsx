import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import RiskEvaluationForm from "./Components/RiskEvaluationForm";
import AdminPanel from "./Components/AdminPanel";
import ThanksPage from "./Components/ThanksPage"; // ← nuevo import
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/participante" element={<RiskEvaluationForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/gracias" element={<ThanksPage />} /> {/* nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;






