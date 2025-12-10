'use client'

/**
 * PLAYLIST FOOTER
 * Footer fijo que muestra la playlist actual
 * Usa usePlaylist() para acceder al Context y obtener:
 *   - playlist: array de tracks
 *   - removeTrack: función para eliminar un track
 *   - clearPlaylist: función para limpiar todo
 * 
 * El botón "Guardar en Spotify" ahora navega a /dashboard/guardar
 * donde el usuario puede revisar la playlist y darle un nombre personalizado.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePlaylist } from '@/context/PlaylistContext'

export default function PlaylistFooter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  
  // Obtener el estado de la playlist y favoritos desde el Context
  const { playlist, removeTrack, clearPlaylist, toggleFavorite, isFavorite } = usePlaylist()

  /**
   * Navegar a la página de guardar para revisar y nombrar la playlist
   */
  const handleGoToSave = () => {
    if (playlist.length === 0) return
    router.push('/dashboard/guardar')
  }

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
      style={{ backgroundColor: 'var(--bg-card)', borderTop: '2px solid var(--primary)' }}
    >
      {/* Barra colapsable - siempre visible */}
      <div 
        className="container mx-auto px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gradient">Tu Playlist</h2>
          <span className="badge-primary">
            {playlist.length} canciones
          </span>
        </div>

        <div className="flex items-center gap-4">
          {playlist.length > 0 && (
            <>
              {/* Botón Guardar - navega a /dashboard/guardar */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleGoToSave()
                }}
                className="btn-primary px-4 py-2 rounded-full text-sm"
              >
                Guardar en Spotify
              </button>

              {/* Botón Limpiar */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearPlaylist()
                }}
                className="btn-accent px-4 py-2 rounded-full text-sm"
              >
                Limpiar
              </button>
            </>
          )}
          
          <span className="text-2xl" style={{ color: 'var(--text-secondary)' }}>
            {isExpanded ? '▼' : '▲'}
          </span>
        </div>
      </div>

      {/* Contenido expandible */}
      <div 
        className={`container mx-auto px-4 overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-64 py-4' : 'max-h-0'
        }`}
      >
        <hr className="divider-gradient mb-4" />
        
        {playlist.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>            <p>Añade canciones desde los widgets de artistas o canciones</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {playlist.map((track, index) => (
              <div 
                key={track.id || index}
                className="track-item flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: 'var(--text-muted)' }}>{index + 1}</span>
                  {track.album?.images?.[0] && (
                    <img 
                      src={track.album.images[0].url} 
                      alt={track.name}
                      className="w-10 h-10 rounded"
                    />
                  )}
                  <div>
                    <p style={{ color: 'var(--text-primary)' }}>{track.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {track.artists?.map(a => a.name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Botón de Favorito (OBLIGATORIO) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(track)
                    }}
                    className="px-2 py-1 rounded hover:bg-opacity-20"
                    style={{ 
                      color: isFavorite(track.id) ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                    title={isFavorite(track.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  >
                    {isFavorite(track.id) ? '⭐' : '☆'}
                  </button>
                  {/* Botón de Eliminar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTrack(track.id)
                    }}
                    className="text-accent-color hover:text-accent-light px-2"
                    title="Eliminar de la playlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
