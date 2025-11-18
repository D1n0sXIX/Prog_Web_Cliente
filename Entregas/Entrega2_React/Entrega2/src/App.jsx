import React, { useState } from 'react';
import './App.css';
import './componentes/ToDo.css';
import FormToDo from './componentes/FormToDo.jsx';
import ListToDo from './componentes/ListToDo.jsx';
import Logo from './componentes/Logo.jsx';

function App() {
  const [tareas, setTareas] = useState([]); // Estado para las tareas

  // Funcion para agregar una nueva tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]); // Añade tarea a la lista
  };

  // Funcion para eliminar una tarea
  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index)); // Elimina tarea por su index
  };

  return (
    <main>
      <Logo />
      <div className="contenedorMain">
        <h1>Mis tareas</h1>
        <FormToDo agregarTarea={agregarTarea} />
        <ListToDo tareas={tareas} eliminarTarea={eliminarTarea} />
      </div>
    </main>
  );
}

export default App;
