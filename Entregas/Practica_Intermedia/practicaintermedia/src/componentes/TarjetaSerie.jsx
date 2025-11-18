import React from 'react'
import './ListaResultados.css'

export default function TarjetaSerie({ show, onClick }) {
  return (
    <div className="tarjeta-serie" onClick={() => onClick && onClick(show)}>
      {show.image?.medium && (
        <img src={show.image.medium} alt={show.name} className="imagen-serie" />
      )}

      <div className="contenido-tarjeta">
        <h3>{show.name}</h3>

        <p className="generos">
          <strong>Generos:</strong> {show.genres?.length ? show.genres.join(', ') : 'N/A'}
        </p>

        <p className="rating">
          <strong>Rating:</strong> {show.rating?.average ? `${show.rating.average}/10` : 'N/A'}
        </p>
      </div>
    </div>
  )
}
