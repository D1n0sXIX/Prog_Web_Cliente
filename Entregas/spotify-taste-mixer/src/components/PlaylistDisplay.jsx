'use client'

/**
 * ============================================
 * 🎼 PLAYLIST DISPLAY
 * ============================================
 * 
 * Según el README del profesor:
 * - Área central de playlist display
 * - Mostrar lista de canciones generadas
 * - Información de cada track: portada, título, artista, duración
 * 
 * Funcionalidades OBLIGATORIAS:
 * - Eliminar tracks individuales ✅
 * - Marcar tracks como favoritos (localStorage) ✅
 * - Refrescar playlist ✅
 * - Añadir más canciones ✅
 */

import TrackCard from './TrackCard'

export default function PlaylistDisplay({
  playlist = [],
  onRemoveTrack,
  onToggleFavorite,
  isFavorite,
  onRefresh,
  loading
}) {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gradient">🎼 Tu Playlist</h2>

        {playlist.length > 0 && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn-primary px-4 py-2 rounded-full text-sm disabled:opacity-50"
          >
            {loading ? '⏳ Generando...' : '🔄 Refrescar'}
          </button>
        )}
      </div>

      {playlist.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          <p className="text-5xl mb-4">🎵</p>
          <p className="text-lg mb-2">No hay canciones todavía</p>
          <p className="text-sm">Configura los widgets de arriba y pulsa "Generar Playlist"</p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            {playlist.length} canciones en tu playlist
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {playlist.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                onRemove={() => onRemoveTrack(track.id)}
                onToggleFavorite={() => onToggleFavorite(track)}
                isFavorite={isFavorite(track.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
