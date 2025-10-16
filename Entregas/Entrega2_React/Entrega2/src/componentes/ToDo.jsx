import React, { useState } from "react";
import FormToDo from "./FormToDo.jsx";
import ListToDo from "./ListToDo.jsx";

export default function ToDo() {
  const [tareas, setTareas] = useState([]); // Estado para las tareas

  // Función para agregar tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  return (
    <div className="contenedorMain">
      <h1>Lista de tareas</h1>
      <FormToDo agregarTarea={agregarTarea} />
      <ListToDo tareas={tareas} />
    </div>
  );
}
