import React, { useState } from "react";


export default function ToDo({ tarea, index, eliminarTarea }) {
  const [tachada, setTachada] = useState(false); // Estado para saber si la tarea está tachada

  const alternarTachado = () => {
    setTachada(!tachada); // Alternar entre tachada y no tachada
  };

  const eliminar = () => {
    eliminarTarea(index);
  };

  return (
    <li id={`tarea-${index}`} className={tachada ? "hecho" : ""}>
      {tarea}
      <button onClick={alternarTachado}>Hecha</button>
      <button className="eliminar-button" onClick={eliminar}>Eliminar</button>
    </li>
  );
}
