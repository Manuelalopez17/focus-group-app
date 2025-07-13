import React from "react";
import logo from "../assets/logoFocusGroup.png";

function ThanksPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <img
        src={logo}
        alt="Logo del proyecto"
        style={{
          width: "200px",
          marginBottom: "1rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <h2>¡Gracias por participar!</h2>
      <p>Has completado la primera ronda de evaluación.</p>
    </div>
  );
}

export default ThanksPage;

