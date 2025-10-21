import React, { useState } from 'react';
import './App.css';  // Asegúrate de que este archivo esté primero
import './componentes/ToDo.css'; // Carga `ToDo.css` después para asegurar que se apliquen los estilos
import FormToDo from './componentes/FormToDo.jsx';
import ListToDo from './componentes/ListToDo.jsx';
import Logo from './componentes/Logo.jsx';

function App() {
  const [tareas, setTareas] = useState([]); // Estado para las tareas

  // Función para agregar una nueva tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]); // Añadir tarea a la lista
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index)); // Eliminar tarea por su índice
  };

  return (
    <main>
      <Logo />
      <div className="contenedorMain">
        <h1>Mis tareas</h1>
        <FormToDo agregarTarea={agregarTarea} />
        <ListToDo tareas={tareas} eliminarTarea={eliminarTarea} /> {/* Lista de tareas */}
      </div>
    </main>
  );
}

export default App;
