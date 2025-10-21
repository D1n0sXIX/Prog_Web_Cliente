import React from "react";
import ToDo from "./ToDo"; // Importamos el componente ToDo

export default function ListToDo({ tareas, eliminarTarea }) {
  return (
    <div>
      <ul>
        {tareas.map((tarea, index) => (
          <ToDo key={index} index={index} tarea={tarea}
            eliminarTarea={eliminarTarea} // Pasamos la funcin como parametro de entrada
          />
        ))}
      </ul>
    </div>
  );
}
