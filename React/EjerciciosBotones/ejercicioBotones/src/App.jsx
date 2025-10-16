import './App.css'
import Contador from './componentes/Contador'
import TresBotones from './componentes/TresBotones'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Ejercicio: Tres Botones</h1>
      </header>
      <main>
        <TresBotones />
        <Contador />  
      </main>
    </div>
  )
}

export default App
