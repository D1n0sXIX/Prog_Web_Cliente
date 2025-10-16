import React from 'react';
import './MyButtom.css';

export default function MyButtom({ nombre, mensaje }) {
  const handleClick = () => {
    // Para ver que funciona
    //console.log('Boton pulsado:', { nombre, mensaje});
    alert(mensaje);
  };

  return (
    <button type="button" className="my-button" onClick={handleClick}>
      {nombre}
    </button>
  );
}
