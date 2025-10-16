import { useState, useRef } from "react";

export default function ContadorConBotones() {
  const counter = useRef(0);

  const [mostrarContador, setMostrarContador] = useState(false);

  //  incrementa el contador
  const incrementar = () => {
    counter.current++;
    console.log("Contador incrementado a:", counter.current);
  };

  const mostrar = () => {
    setMostrarContador(true);
  };

  const resetear = () => {
    counter.current = 0;
    setMostrarContador(false);
  };

  return (
    <div>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={mostrar}>Mostrar Contador</button>
      <button onClick={resetear}>Reset</button>

      {mostrarContador && <p>El contador es: {counter.current}</p>}
    </div>
  );
}
