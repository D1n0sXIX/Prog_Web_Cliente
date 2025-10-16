import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Logo from './componentes/Logo.jsx'
import ToDo from './componentes/ToDo.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
         <Logo/>
         <ToDo/>
      </main>
    </> 
  )
}

export default App
