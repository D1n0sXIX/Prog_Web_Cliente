import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContadorConBotones from './componentes/ContadorConBotones'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <header>Ejercicio de 2 botones</header>
        <main>
          <ContadorConBotones/>
        </main>
      
      </div>
    </>
  )
}

export default App
