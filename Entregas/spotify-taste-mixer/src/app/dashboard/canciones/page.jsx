'use client'

/**
 * PÁGINA EXPANDIDA DE CANCIONES
 * 
 * Versión avanzada del TrackWidget.
 * - Más espacio para búsqueda
 * - Muestra más información de cada canción
 * - Usa el mismo estado que el Dashboard (Context)
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchTracks } from '@/lib/spotify'
import { usePlaylist } from '@/context/PlaylistContext'

export default function CancionesPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Obtener el estado compartido del Context
  const { selectedTracks, setSelectedTracks, addTrack, removeTrack, playlist, toggleFavorite, isFavorite } = usePlaylist()

  // Verificar si una canción está en la playlist
  const isInPlaylist = (trackId) => playlist.some(t => t.id === trackId)

  // Buscar canciones cuando cambia el query (con debounce)
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const tracks = await searchTracks(query, 20)
        setResults(tracks)
      } catch (error) {
        console.error('Error buscando canciones:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  //Toggle selección de trac
  const toggleTrack = (track) => {
    const exists = selectedTracks.find(t => t.id === track.id)
    if (exists) {
      setSelectedTracks(selectedTracks.filter(t => t.id !== track.id))
    } else {
      setSelectedTracks([...selectedTracks, track])
    }
  }

  // Formatear duración de ms a mm:ss --> Copilot
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isSelected = (trackId) => selectedTracks.some(t => t.id === trackId)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm mb-4 inline-block hover:underline" style={{ color: 'var(--primary)' }}>
          ← Volver al dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gradient">Selección de Canciones avanzadas</h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Busca y selecciona canciones de forma ampliada para tu playlist
        </p>
      </div>

      {/* Canciones seleccionadas */}
      {selectedTracks.length > 0 && (
        <div className="card p-4 mb-6">
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            Canciones seleccionadas ({selectedTracks.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTracks.map(track => (
              <div
                key={track.id}
                onClick={() => toggleTrack(track)}
                className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {track.album?.images?.[0] && (
                  <img src={track.album.images[0].url} alt={track.name} className="w-6 h-6 rounded" />
                )}
                <span className="text-sm text-white truncate max-w-[150px]">{track.name}</span>
                <span className="text-white">×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar canciones..."
          className="input text-lg py-4"
          autoFocus
        />
        {loading && ( // Indicador de carga -> Copilot
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        )}
      </div>

      {/* Resultados de busqueda */}
      <div className="space-y-3">
        {results.map((track) => (
          <div key={track.id} // Cada track
            className={`card p-4 transition-all ${isSelected(track.id) ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className="flex items-center gap-4">
              {/* Portada del álbum */}
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-hover)' }}>
                {track.album?.images?.[0] ? (
                  <img src={track.album.images[0].url} alt={track.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🎵</div>
                )}
              </div>

              {/* Info de la canción */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {track.name}
                </h3>
                <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                  {track.artists?.map(a => a.name).join(', ')}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {track.album?.name} • {formatDuration(track.duration_ms)}
                </p>
              </div>

              {/* Popularidad */}
              <div className="text-center hidden md:block">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Popularidad</p>
                <p className="font-semibold" style={{ color: 'var(--primary)' }}>{track.popularity}%</p>
              </div>

              {/* Botones de accion */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(track)}
                  className="p-2 rounded transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-hover)',
                    color: isFavorite(track.id) ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                  title={isFavorite(track.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                  {isFavorite(track.id) ? '⭐' : '☆'}
                </button>
                
                {isInPlaylist(track.id) ? (
                  <button onClick={() => removeTrack(track.id)}
                    className="px-4 py-2 text-sm rounded transition-colors bg-red-600 hover:bg-red-700 text-white">
                    Eliminar
                  </button>
                ) : (
                  <button  onClick={() => addTrack(track)}
                    className="btn-primary px-4 py-2 text-sm rounded transition-colors">
                    Seleccionar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado inicial */}
      {!query && results.length === 0 && ( // Si no hay búsqueda y no hay resultados
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">Escribe el nombre de una canción para buscarla</p>
        </div>
      )}

      {/* Sin resultados */}
      {query && !loading && results.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">No se encontraron canciones para "{query}"</p>
        </div>
      )}
    </div>
  )
}
