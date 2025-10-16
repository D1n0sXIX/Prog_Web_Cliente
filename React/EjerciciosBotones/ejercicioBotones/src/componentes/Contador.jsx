import { useState } from "react";
import './Contador.css';

export default function Contador() {
  const [cont, setContador] = useState(0);
  return (
    <div>
      <h2>Contador: {cont}</h2>
        <button onClick={() => setContador(cont + 1)}>CLICA</button>
    </div>
  );
}