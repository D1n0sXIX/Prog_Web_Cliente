'use client'

/**
 * TRACK WIDGET
 * Según el README: 
 * - Recibe props: onSelect, selectedTracks
 * - Emite cambios al componente padre (Dashboard)
 * - Búsqueda de canciones
 * - Mostrar portada, título, artista
 * - Selección múltiple
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchTracks } from '@/lib/spotify'

export default function TrackWidget({ selectedTracks = [], onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Buscar tracks cuando cambia el query (con debounce)
  useEffect(() => { 
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => { // Debouncing
      setLoading(true)
      try {
        const tracks = await searchTracks(query, 5)
        setResults(tracks)
      } catch (error) {
        console.error('Error buscando canciones:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300) // Debouncing de 300ms

    return () => clearTimeout(timeoutId)
  }, [query])

  /* Toggle selección de track
   * Comunica el cambio al padre mediante onSelect
   */
  const toggleTrack = (track) => { // Verificar si el track ya está seleccionado
    const exists = selectedTracks.find(t => t.id === track.id)
    if (exists) {
      // Quitar track
      onSelect(selectedTracks.filter(t => t.id !== track.id))
    } else {
      // Añadir track
      onSelect([...selectedTracks, track])
    }
  }

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Canciones</h3>
        <Link href="/dashboard/canciones" 
          className="text-xs hover:underline"
          style={{ color: 'var(--primary)' }}
        >
          Versión avanzada →
        </Link>
      </div>

      <input type="text"
        placeholder="Buscar canciones..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mb-3"
      />

      {loading && ( // Mostrar estado de carga -> Copilot
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Buscando...</p>
      )}

      {/* Resultados de búsqueda */}
      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
        {results.map(track => (
          <div key={track.id} onClick={() => toggleTrack(track)}
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
              selectedTracks.find(t => t.id === track.id) ? 'ring-2 ring-green-500' : ''
            }`}

            style={{ backgroundColor: 'var(--bg-hover)' }}
          >
            {track.album?.images?.[0] ? ( // Imagen del álbum -> Copilot
              <img src={track.album.images[0].url} alt={track.name} className="w-10 h-10 rounded object-cover" />
            ) : (
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>🎵</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>{track.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {track.artists?.map(a => a.name).join(', ')}
              </p>
            </div>

            {selectedTracks.find(t => t.id === track.id) && ( // Indicador de selección -> Copilot
              <span style={{ color: 'var(--primary)' }}>✓</span>
            )}
          </div>
        ))}
      </div>

      {/* Tracks seleccionados */}
      {selectedTracks.length > 0 && (
        <div>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Seleccionados ({selectedTracks.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedTracks.slice(0, 5).map(track => ( // Mostrar hasta 5 tracks seleccionados
              <span key={track.id} onClick={() => toggleTrack(track)}
                className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                {track.name.slice(0, 15)}... ×
              </span>
            ))}
            {selectedTracks.length > 5 && ( // Indicador de más seleccionados -> Copilot
              <span className="text-xs px-2 py-1" style={{ color: 'var(--text-muted)' }}>
                +{selectedTracks.length - 5} más
              </span>
            )}
          </div>
        </div>
      )}

      {/* Estado inicial */}
      {!query && selectedTracks.length === 0 && (
        <p className="text-sm text-center py-2" style={{ color: 'var(--text-muted)' }}>
          Busca y selecciona canciones específicas
        </p>
      )}
    </div>
  )
}
