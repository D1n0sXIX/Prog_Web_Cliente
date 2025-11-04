import { useState } from 'react'
import './App.css'
import Logo from './components/Logo.jsx'
import Contacto from './components/Contacto.jsx'
import FormRegistro from './components/FormRegistro.jsx'
import DatosPersonalesResultados from './components/Resultados/DatosPersonales.jsx'
import PreferenciasSeleccionadas from './components/Resultados/PreferenciasSeleccionadas.jsx'

export default function App() {
  const [submittedData, setSubmittedData] = useState(null)

  return (
    <>
      <Logo />
      <h1>Bienvenido al Reto Fitness</h1>
      <div className='Formalariobase'>
        <FormRegistro onDataSubmit={setSubmittedData} />
      </div>
      <div className='Resultados'>
        <h2>Resultados del Registro:</h2>

        {/* Mostrar datos enviados si existen */}
        {submittedData && (
          <>
            <DatosPersonalesResultados data={submittedData} />
            <PreferenciasSeleccionadas data={submittedData} />
          </>
        )}
      </div>
      <Contacto />
    </>
  )
}
