import { useState } from 'react'
import './ListaResultados.css'
import TarjetaSerie from './TarjetaSerie'
import DetalleTarjeta from './DetalleTarjeta'

export default function ListaResultados({ resultados }) {
  const [seleccionado, setSeleccionado] = useState(null)

  // Si no hay resultados, mostramos un mensaje
  if (!resultados || resultados.length === 0) {
    return <p>No hay resultados para mostrar</p>
  }

  return (
    <div className="lista-resultados">
      <h2>Resultados encontrados: {resultados.length}</h2>

      <div className="grid-resultados">
        {resultados.map((item) => (
          <TarjetaSerie key={item.show.id} show={item.show} onClick={setSeleccionado} />
        ))}
      </div>

      {seleccionado && (
        <DetalleTarjeta show={seleccionado} onClose={() => setSeleccionado(null)} />
      )}
    </div>
  )
}
