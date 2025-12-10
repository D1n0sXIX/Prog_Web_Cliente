'use client'

/**
 * FAVORITOS WIDGET
 * Muestra las canciones guardadas como favoritos en localStorage.
 * Permite:
 * - Ver todos los favoritos
 * - Añadir favoritos a la playlist actual
 * - Quitar canciones de favoritos
 */

import { usePlaylist } from '@/context/PlaylistContext'

export default function FavoritosWidget() {
  const { favorites, toggleFavorite, addTrack, playlist } = usePlaylist()


   //Añadir un favorito a la playlist
  const handleAddToPlaylist = (track) => {
    addTrack(track)
  }

  // Añadir todos los favoritos a la playlist
  const handleAddAllToPlaylist = () => {
    favorites.forEach(track => {
      addTrack(track)
    })
  }

  // Verificar si un track ya está en la playlist
  const isInPlaylist = (trackId) => {
    return playlist.some(t => t.id === trackId)
  }

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Favoritos</h3>
        {favorites.length > 0 && ( // Mostrar botón solo si hay favoritos
          <button onClick={handleAddAllToPlaylist}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            Añadir todos
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-6" style={{ color: 'var(--text-muted)' }}>
          <p className="text-2xl mb-2">☆</p>
          <p className="text-sm">No tienes favoritos guardados</p>
          <p className="text-xs mt-1">Marca canciones con ⭐ para guardarlas aquí</p>
        </div>
      ) : ( // Si hay favoritos
        <>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            {favorites.length} canción{favorites.length !== 1 ? 'es' : ''} guardada{favorites.length !== 1 ? 's' : ''}
          </p>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {favorites.map(track => (
              <div
                key={track.id}
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: 'var(--bg-hover)' }}
              >
                {/* Imagen del album -> Copilot*/}
                {track.album?.images?.[0] ? (
                  <img 
                    src={track.album.images[0].url} 
                    alt={track.name} 
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : ( // Placeholder si no hay imagen -> Copilot
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-dark)' }}
                  >
                    🎵
                  </div>
                )}

                {/* Info del track */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {track.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {track.artists?.map(a => a.name).join(', ')}
                  </p>
                </div>

                {/* Botones de accion */}
                <div className="flex items-center gap-1">
                  {/* Añadir a playlist */}
                  <button onClick={() => handleAddToPlaylist(track)}
                    disabled={isInPlaylist(track.id)}
                    className="text-xs px-2 py-1 rounded disabled:opacity-50"
                    style={{ 
                      backgroundColor: isInPlaylist(track.id) ? 'var(--bg-dark)' : 'var(--primary)',
                      color: 'white'
                    }}
                    title={isInPlaylist(track.id) ? 'Ya está en la playlist' : 'Añadir a playlist'}
                  >
                    {isInPlaylist(track.id) ? '✓' : '+'}
                  </button>

                  {/* Quitar de favoritos */}
                  <button onClick={() => toggleFavorite(track)}
                    className="text-xs px-2 py-1 rounded hover:opacity-80"
                    style={{ color: 'var(--primary)' }}
                    title="Quitar de favoritos"
                  >
                    ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
