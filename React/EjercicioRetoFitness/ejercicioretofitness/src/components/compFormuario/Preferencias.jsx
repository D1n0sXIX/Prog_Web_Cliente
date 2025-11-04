import React from "react";
import { useFormContext } from "react-hook-form";
import ListCheck from "./ListCheck";

const TIPOS = ["Cardio", "Fuerza", "HIIT", "Yoga", "Pilates", "Crossfit"];

const OBJETIVOS = [
  "Perder peso",
  "Ganar masa muscular",
  "Mejorar resistencia",
  "Mejorar flexibilidad",
  "Salud general",
];

const DIAS = [
  { value: "l", label: "Lunes" },
  { value: "m", label: "Martes" },
  { value: "x", label: "Miércoles" },
  { value: "j", label: "Jueves" },
  { value: "v", label: "Viernes" },
  { value: "s", label: "Sábado" },
  { value: "d", label: "Domingo" },
];



export default function Preferencias() {
  const { watch } = useFormContext();
  const tiposSeleccionados = watch("tipoEntrenamiento");

  return (
    <section aria-label="Preferencias de entrenamiento">
      <h3>Preferencias de entrenamiento</h3>

      <ListCheck name="tipoEntrenamiento" label="Tipo de entrenamiento" options={TIPOS} />

      <ListCheck name="objetivos" label="Objetivos" options={OBJETIVOS} />

      <ListCheck name="disponibilidad" label="Disponibilidad:" options={DIAS} />

      {tiposSeleccionados && Array.isArray(tiposSeleccionados) && tiposSeleccionados.length > 0 && (
        <p className="muted">Tipos seleccionados: {tiposSeleccionados.join(", ")}</p>
      )}
    </section>
  );
}
