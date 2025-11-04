import React from "react";

export default function DatosPersonalesResultados({ data }) {
  if (!data) return null;

  const {
    nombre,
    email,
    telefono,
    direccion,
    ciudad,
    codigoPostal,
    tipoEntrenamiento,
    objetivos,
    disponibilidad,
  } = data;

  const joinSafe = (val) => (Array.isArray(val) ? val.join(", ") : val || "—");

  return (
    <section aria-label="Datos enviados">
      <h3>Datos personales</h3>
      <p><strong>Nombre:</strong> {nombre || "—"}</p>
      <p><strong>Email:</strong> {email || "—"}</p>
      <p><strong>Teléfono:</strong> {telefono || "—"}</p>

      <h3>Direccion</h3>
      <p><strong>Dirección:</strong> {direccion || "—"}</p>
      <p><strong>Ciudad:</strong> {ciudad || "—"}</p>
      <p><strong>Código postal:</strong> {codigoPostal || "—"}</p>
    </section>
  );
}
