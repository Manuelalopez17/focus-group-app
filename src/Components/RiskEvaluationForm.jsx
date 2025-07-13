import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/LogoFocusGroup.png";

// Datos de riesgos por etapa (solo ejemplo con "Diseño")
const risksByStage = {
  Diseño: [
    {
      id: "D01",
      descripcion: "Ambigüedad en especificaciones técnicas",
    },
    {
      id: "D02",
      descripcion: "Errores de diseño estructural",
    },
  ],
  // Aquí se agregarán las demás etapas
};

const etapasProyecto = [
  "Suministro",
  "Prefactibilidad",
  "Factibilidad",
  "Planeación",
  "Contratación y Adquisición",
  "Diseño",
  "Fabricación",
  "Logística y Transporte",
  "Montaje",
  "Construcción",
  "Puesta en marcha y Disposición Final",
];

function RiskEvaluationForm() {
  const navigate = useNavigate();
  const [etapaSeleccionada, setEtapaSeleccionada] = useState("");
  const [evaluaciones, setEvaluaciones] = useState({});

  const handleEtapaChange = (e) => {
    const etapa = e.target.value;
    setEtapaSeleccionada(etapa);
    const riesgos = risksByStage[etapa] || [];
    const inicial = {};
    riesgos.forEach((riesgo) => {
      inicial[riesgo.id] = {
        impacto: "",
        frecuencia: "",
        importanciaImpacto: "",
      };
    });
    setEvaluaciones(inicial);
  };

  const handleChange = (id, campo, valor) => {
    setEvaluaciones((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const calcularScore = (riesgo) => {
    const i = parseInt(riesgo.impacto) || 0;
    const f = parseInt(riesgo.frecuencia) || 0;
    const importancia = parseFloat(riesgo.importanciaImpacto) || 100;
    const scoreBase = i * f;
    const scoreFinal = scoreBase * (importancia / 100);
    return { scoreBase, scoreFinal };
  };

  const handleGuardarEvaluaciones = () => {
    // Aquí se podría subir a Firebase
    navigate("/gracias");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <img
        src={logoImage}
        alt="Logo del proyecto"
        style={{ width: "200px", display: "block", margin: "0 auto 2rem" }}
      />

      <h2>Evaluación de Riesgos</h2>

      <label>
        Selecciona la etapa del proyecto:
        <select value={etapaSeleccionada} onChange={handleEtapaChange}>
          <option value="">-- Selecciona una etapa --</option>
          {etapasProyecto.map((etapa) => (
            <option key={etapa} value={etapa}>
              {etapa}
            </option>
          ))}
        </select>
      </label>

      {etapaSeleccionada &&
        risksByStage[etapaSeleccionada]?.map((riesgo) => {
          const valores = evaluaciones[riesgo.id] || {};
          const { scoreBase, scoreFinal } = calcularScore(valores);

          return (
            <div
              key={riesgo.id}
              style={{
                borderTop: "1px solid #ccc",
                marginTop: "1rem",
                paddingTop: "1rem",
              }}
            >
              <strong>{riesgo.id}:</strong> {riesgo.descripcion}
              <br />
              Impacto:
              <select
                value={valores.impacto || ""}
                onChange={(e) =>
                  handleChange(riesgo.id, "impacto", e.target.value)
                }
              >
                <option value="">--</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              Frecuencia:
              <select
                value={valores.frecuencia || ""}
                onChange={(e) =>
                  handleChange(riesgo.id, "frecuencia", e.target.value)
                }
              >
                <option value="">--</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              Importancia del Impacto (%):
              <select
                value={valores.importanciaImpacto || ""}
                onChange={(e) =>
                  handleChange(
                    riesgo.id,
                    "importanciaImpacto",
                    e.target.value
                  )
                }
              >
                <option value="">--</option>
                {[100, 80, 60, 40, 20].map((v) => (
                  <option key={v} value={v}>
                    {v}%
                  </option>
                ))}
              </select>

              <p>
                <strong>Importancia de la Frecuencia:</strong> 100%
              </p>
              <p>
                🎯 <strong>Score Base (I×F):</strong> {scoreBase}
              </p>
              <p>
                ⭐ <strong>Score Final con Importancia:</strong>{" "}
                {scoreFinal.toFixed(2)}
              </p>
            </div>
          );
        })}

      {etapaSeleccionada && (
        <button
          style={{
            marginTop: "2rem",
            backgroundColor: "#004080",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={handleGuardarEvaluaciones}
        >
          Guardar Evaluaciones
        </button>
      )}
    </div>
  );
}

export default RiskEvaluationForm;
