import React, { useState, useEffect, useRef } from 'react'
import './Navegador.css'

export default function Navegador({ onResultados }) {
  const [nombre, setNombre] = useState('')
  const [genero, setGenero] = useState('')
  const [calificacion, setCalificacion] = useState('')

  // Guardamos la referencia de onResultados en un ref para evitar
  // que la función cambiante (por renders de App) vuelva a disparar el efecto.
  const onResultadosRef = useRef(onResultados)
  useEffect(() => { onResultadosRef.current = onResultados }, [onResultados])

  // Llamamos a onResultados con debounce cada vez que cambian los inputs
  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof onResultadosRef.current === 'function') {
        onResultadosRef.current({ nombre, genero, calificacion })
      }
    }, 500) // 500ms debounce

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

        {/* Input por género */}
        <div className="campo-busqueda">
          <label htmlFor="genero">Género</label>
          <input
            id="genero"
            type="text"
            placeholder="Genero -> Ej: Drama"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="input-busqueda"
          />
        </div>

        {/* Input por calificación */}
        <div className="campo-busqueda">
          <label htmlFor="calificacion">Calificación mínima</label>
          <input
            id="calificacion"
            type="number"
            min="0"
            placeholder="Calificación -> Ej: 8"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            className="input-busqueda"
          />
        </div>

        {/* Eliminamos el botón de búsqueda para búsqueda en vivo */}
      </form>
    </div>
  )
}
