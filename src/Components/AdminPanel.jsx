import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import logo from "../assets/LogoFocusGroup.png"; // ← RUTA CORREGIDA

function AdminPanel() {
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "respuestas");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val() || {};
      setResponses(data);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <img
        src={logo}
        alt="Logo del proyecto"
        style={{
          width: "200px",
          marginBottom: "1.5rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <h2 style={{ textAlign: "center" }}>Panel de Administración</h2>

      {Object.keys(responses).length === 0 ? (
        <p style={{ textAlign: "center" }}>Aún no hay respuestas.</p>
      ) : (
        Object.entries(responses).map(([etapa, respuestasEtapa]) => (
          <div key={etapa}>
            <h3>{etapa}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Riesgo</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Promedio Impacto</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Promedio Frecuencia</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Score Base</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Score Final</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(respuestasEtapa).map(([riesgo, evaluaciones]) => {
                  const total = evaluaciones.length;
                  const promedioImpacto =
                    evaluaciones.reduce((sum, e) => sum + (e.impacto || 0), 0) / total;
                  const promedioFrecuencia =
                    evaluaciones.reduce((sum, e) => sum + (e.frecuencia || 0), 0) / total;
                  const promedioImportancia =
                    evaluaciones.reduce((sum, e) => sum + (e.importancia || 0), 0) / total;

                  const scoreBase = promedioImpacto * promedioFrecuencia;
                  const scoreFinal = scoreBase * (promedioImportancia / 5);

                  return (
                    <tr key={riesgo}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{riesgo}</td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {promedioImpacto.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {promedioFrecuencia.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {scoreBase.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {scoreFinal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;
