import React, { useState } from "react";
import ListToDo from "./ListToDo.jsx";

export default function FormToDo({ agregarTarea }) {
  const [tarea, setTarea] = useState("");

  const cambio = (estado) => {
    setTarea(estado.target.value);
  };

  const enviar = (evento) => {
    evento.preventDefault();
    if (tarea.trim()) {
      agregarTarea(tarea); // Usamos la función para agregar tarea
      setTarea(""); // Limpiamos el input
    }
  };

  return (
    <div>
      <form id="formulario" onSubmit={enviar}>
        <label htmlFor="inputString"></label>
        <input type="text" id="inputString" value={tarea} onChange={cambio} />
        <button type="submit" id="boton">Añadir tarea</button>
      </form>
    </div>
  );
}
