'use client'

/**
 * ARTIST WIDGET * 
 * Según el README:
 * - Recibe props: onSelect, selectedArtists
 * - Emite cambios al componente padre (Dashboard)
 * - Búsqueda con debouncing
 * - Selección múltiple (límite: 5 artistas)
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchArtists } from '@/lib/spotify'

export default function ArtistWidget({ selectedArtists = [], onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Buscar artistas cuando cambia el query (con debounce)
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => { // Debouncing
      setLoading(true)
      try {
        const artists = await searchArtists(query, 5)
        setResults(artists)
      } catch (error) {
        console.error('Error buscando artistas:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300) // Debouncing de 300ms

    return () => clearTimeout(timeoutId)
  }, [query])

  // Comunica el cambio al padre mediante onSelect
  const toggleArtist = (artist) => {
    const exists = selectedArtists.find(a => a.id === artist.id)
    if (exists) {
      // Quitar artista
      onSelect(selectedArtists.filter(a => a.id !== artist.id))
    } else if (selectedArtists.length < 5) {
      // Añadir artista (máximo 5)
      onSelect([...selectedArtists, artist])
    }
  }

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Artistas</h3>
        <Link href="/dashboard/artistas" 
          className="text-xs hover:underline"
          style={{ color: 'var(--primary)' }}
        >
          Versión avanzada →
        </Link>
      </div>

      <input type="text"
        placeholder="Buscar artistas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mb-3"
      />

      {loading && ( // Indicador de carga
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Buscando...</p>
      )}

      {/* Resultados de búsqueda */}
      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
        {results.map(artist => (
          <div
            key={artist.id}
            onClick={() => toggleArtist(artist)}
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
              selectedArtists.find(a => a.id === artist.id) ? 'ring-2 ring-green-500' : ''
            }`}
            style={{ backgroundColor: 'var(--bg-hover)' }}
          >
            {artist.images?.[0] ? (
              <img src={artist.images[0].url} alt={artist.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>🎤</div>
            )}
            <span className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{artist.name}</span>
            {selectedArtists.find(a => a.id === artist.id) && (
              <span style={{ color: 'var(--primary)' }}>✓</span>
            )}
          </div>
        ))}
      </div>

      {/* Artistas seleccionados */}
      {selectedArtists.length > 0 && (
        <div>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Seleccionados ({selectedArtists.length}/5):
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedArtists.map(artist => (
              <span
                key={artist.id}
                onClick={() => toggleArtist(artist)}
                className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                {artist.name} ×
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Estado inicial */}
      {!query && selectedArtists.length === 0 && (
        <p className="text-sm text-center py-2" style={{ color: 'var(--text-muted)' }}>
          Busca y selecciona hasta 5 artistas
        </p>
      )}
    </div>
  )
}
