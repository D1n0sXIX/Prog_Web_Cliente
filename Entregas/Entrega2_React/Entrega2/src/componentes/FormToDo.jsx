import React, { useState } from "react";

export default function FormToDo({ agregarTarea }) {
  const [tarea, setTarea] = useState(""); // Estado del input

  // Función para manejar el cambio en el input
  const actualizar = (evento) => {
    setTarea(evento.target.value);
  };

  const addTarea = (evento) => {
    evento.preventDefault(); // Prevenir la recarga de la página
    agregarTarea(tarea); // Llamamos a la función para agregar la tarea
    setTarea(""); // Limpiamos el input
  };

  return (
    <form id="formulario" onSubmit={addTarea}>
      <label htmlFor="inputString"></label>
      <input type="text" id="inputString" value={tarea} onChange={actualizar}/>
      <button type="submit">Añadir tarea</button>
    </form>
  );
}
