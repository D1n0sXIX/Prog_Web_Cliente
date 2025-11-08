import React from 'react'
import './ListaResultados.css'

export default function DetalleTarjeta({ show, onClose }) {
  if (!show) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>

        {show.image?.original && (
          <img src={show.image.original} alt={show.name} className="modal-imagen" />
        )}

        <div className="modal-body">
          <h2>{show.name}</h2>
          <p><strong>Estado:</strong> {show.status || 'N/A'}</p>
          <p><strong>Estreno:</strong> {show.premiered || 'N/A'}</p>
          <p><strong>Duración:</strong> {show.runtime ? `${show.runtime} minutos` : 'N/A'}</p>
          <p><strong>Genero(s):</strong> {show.genres?.length ? show.genres.join(' | ') : 'N/A'}</p>
          <p><strong>Rating:</strong> {show.rating?.average ? `${show.rating.average}/10` : 'N/A'}</p>
          <p><strong>Resumen :</strong></p>

           {/*Esto no lo he  entendido me lo hizo copilot */}
          {show.summary && (
            <div className="modal-summary" dangerouslySetInnerHTML={{ __html: show.summary }} />
          )}
        </div>
      </div>
    </div>
  )
}
