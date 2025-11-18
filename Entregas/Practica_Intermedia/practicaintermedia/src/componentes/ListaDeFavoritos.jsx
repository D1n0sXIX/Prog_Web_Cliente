import React from 'react'
import './ListaResultados.css'

export default function ListaDeFavoritos({ favoritos = [], onRemove }) {
  if (!favoritos || favoritos.length === 0) {
    return (
      <div className="lista-favoritos">
        <h2>Favoritos</h2>
        <p>No hay favoritos todavía</p>
      </div>
    )
  }

  return (
    <div className="lista-favoritos">
      <h2>Favoritos ({favoritos.length})</h2>
      <div className="grid-resultados">
        {favoritos.map((show) => (
          <div key={show.id} className="card-resultado">
            {show.image?.medium ? (
              <img src={show.image.medium} alt={show.name} className="card-imagen" />
            ) : (
              <div className="card-imagen placeholder">No image</div>
            )}
            <div className="card-info">
              <h3>{show.name}</h3>
              <p className="card-genres">{show.genres?.join(', ')}</p>
              <div className="card-actions">
                <button className="boton-eliminar" onClick={() => onRemove?.(show.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
