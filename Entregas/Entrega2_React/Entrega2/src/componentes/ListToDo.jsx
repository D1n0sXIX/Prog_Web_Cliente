import React from "react";

export default function ListToDo({ tareas }) {
  const tacharTarea = (index) => {
    const elemento = document.getElementById(`tarea-${index}`);
    elemento.classList.toggle("hecho");
  };

  return (
    <div>
      <ul>
        {tareas.map((tarea, index) => (
          <li id={`tarea-${index}`} key={index}> /
            {tarea}
            <button onClick={() => tacharTarea(index)}>Completar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
