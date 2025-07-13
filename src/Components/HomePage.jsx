import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/LogoFocusGroup.png"; // ← Nombre corregido
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={logoImage} alt="Logo Focus Group" className="logo-image" />
      <h1 className="home-title">
        Focus Group – Evaluación de Riesgos en Construcción Industrializada en Madera
      </h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/participante")}>Participante</button>
        <button onClick={() => navigate("/administrador")}>Administrador</button>
      </div>
    </div>
  );
};

export default HomePage;
