'use client'

/**
 * ============================================
 * 🎵 TRACK CARD
 * ============================================
 * 
 * Tarjeta de canción según el README del profesor:
 * - Mostrar portada, título, artista, duración
 * - Botón para eliminar de playlist
 * - Botón para marcar como favorito ⭐
 */

export default function TrackCard({ track, onRemove, onToggleFavorite, isFavorite }) {
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className="flex items-center gap-4 p-3 rounded-lg transition-colors"
      style={{ backgroundColor: 'var(--bg-hover)' }}
    >
      {/* Imagen del álbum */}
      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-dark)' }}>
        {track.album?.images?.[0] ? (
          <img
            src={track.album.images[0].url}
            alt={track.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">🎵</div>
        )}
      </div>

      {/* Info de la canción */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {track.name}
        </p>
        <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
          {track.artists?.map(a => a.name).join(', ')}
        </p>
      </div>

      {/* Duración */}
      <span className="text-sm hidden sm:block" style={{ color: 'var(--text-muted)' }}>
        {formatDuration(track.duration_ms)}
      </span>

      {/* Botones de acción */}
      <div className="flex gap-2">
        {/* Botón Favorito - OBLIGATORIO según README */}
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full transition-colors hover:scale-110"
          style={{ color: isFavorite ? 'gold' : 'var(--text-muted)' }}
          title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>

        {/* Botón Eliminar - OBLIGATORIO según README */}
        <button
          onClick={onRemove}
          className="p-2 rounded-full transition-colors hover:scale-110"
          style={{ color: 'var(--accent)' }}
          title="Eliminar de la playlist"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
