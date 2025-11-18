import React from 'react'
import './ListaResultados.css'

export default function DetalleTarjeta({ show, onClose, onAddFavorite }) {
  if (!show) return null // Si no hay show, no renderizamos nada

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Cerrar al hacer click fuera */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Evitar cierre al click dentro */}
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button> {/* Botón de cierre */}

        {show.image?.original && (
          <img src={show.image.original} alt={show.name} className="modal-imagen" />
        )}

        <div className="modal-body"> {/* Cuerpo del modal */}
          <h2>{show.name}</h2>
          <p><strong>Estado:</strong> {show.status || 'N/A'}</p>
          <p><strong>Estreno:</strong> {show.premiered || 'N/A'}</p>
          <p><strong>Duración:</strong> {show.runtime ? `${show.runtime} minutos` : 'N/A'}</p>
          <p><strong>Genero(s):</strong> {show.genres?.length ? show.genres.join(' | ') : 'N/A'}</p>
          <p><strong>Rating:</strong> {show.rating?.average ? `${show.rating.average}/10` : 'N/A'}</p>
          <p><strong>Resumen :</strong></p>

           {/* Resumen con HTML */}
          {show.summary && (
            <div className="modal-summary" dangerouslySetInnerHTML={{ __html: show.summary }} /> 
          )}
          <button className="boton-AñadirLista" onClick={() => {
              if (typeof onAddFavorite === 'function') {
                onAddFavorite(show)
                alert(`Añadido "${show.name}" a la lista de favoritos.`)
              }
            }}>
            Añadir a Favoritos
          </button>
        </div>
      </div>
    </div>
  )
}
