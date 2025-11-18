import React, { useState, useEffect, useRef } from 'react'
import './Navegador.css'

export default function Navegador({ onResultados }) {
  const [nombre, setNombre] = useState('') // Estado para el input de nombre
  const [genero, setGenero] = useState('') // Estado para el input de genero
  const [calificacion, setCalificacion] = useState('') // Estado para el input de calificacion

  // Guardamos la ref de onResultados en un ref para evitar
  // que la función cambiante (por renders de App) vuelva a disparar el efecto de cargado
  const onResultadosRef = useRef(onResultados)
  useEffect(() => { onResultadosRef.current = onResultados }, [onResultados])

  // Llamamos a onResultados con debounce cada vez que cambian los inputs
  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof onResultadosRef.current === 'function') {
        onResultadosRef.current({ nombre, genero, calificacion })
      }
    }, 500) // 500ms debounce --> hecho con copylot

    return () => clearTimeout(handler)
  }, [nombre, genero, calificacion])

  return (
    <div className="navegador">
      <form className="formulario" onSubmit={(e) => e.preventDefault()}>

        {/* Input por nombre */}
        <div className="div-busqueda">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Breaking Bad"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-busqueda"
          />
        </div>

        {/* Input por genero */}
        <div className="campo-busqueda">
          <label htmlFor="genero">Genero</label>
          <input
            id="genero"
            type="text"
            placeholder="Genero -> Ej: Drama"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="input-busqueda"
          />
        </div>

        {/* Input por calificacion */}
        <div className="campo-busqueda">
          <label htmlFor="calificacion">Calificacion mínima</label>
          <input
            id="calificacion"
            type="number"
            min="0"
            placeholder="Calificacion -> Ej: 8"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            className="input-busqueda"
          />
        </div>

      </form>
    </div>
  )
}
