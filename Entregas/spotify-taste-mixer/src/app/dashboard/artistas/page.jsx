'use client'

/**
 * ============================================
 * 🎤 PÁGINA EXPANDIDA DE ARTISTAS
 * ============================================
 * 
 * Versión avanzada del ArtistWidget.
 * - Más espacio para búsqueda
 * - Muestra más información de cada artista
 * - Usa el mismo estado que el Dashboard (Context)
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchArtists, getArtistTopTracks } from '@/lib/spotify'
import { usePlaylist } from '@/context/PlaylistContext'

export default function ArtistasPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedArtist, setExpandedArtist] = useState(null)
  const [artistTracks, setArtistTracks] = useState([])
  const [loadingTracks, setLoadingTracks] = useState(false)

  // Obtener el estado compartido del Context
  const { selectedArtists, setSelectedArtists, addTrack } = usePlaylist()

  // Buscar artistas cuando cambia el query (con debounce)
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const artists = await searchArtists(query, 12)
        setResults(artists)
      } catch (error) {
        console.error('Error buscando artistas:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  /**
   * Toggle selección de artista
   */
  const toggleArtist = (artist) => {
    const exists = selectedArtists.find(a => a.id === artist.id)
    if (exists) {
      setSelectedArtists(selectedArtists.filter(a => a.id !== artist.id))
    } else if (selectedArtists.length < 5) {
      setSelectedArtists([...selectedArtists, artist])
    }
  }

  /**
   * Expandir artista para ver sus top tracks
   */
  const handleExpandArtist = async (artist) => {
    if (expandedArtist?.id === artist.id) {
      setExpandedArtist(null)
      setArtistTracks([])
      return
    }
    
    setExpandedArtist(artist)
    setLoadingTracks(true)
    try {
      const tracks = await getArtistTopTracks(artist.id)
      setArtistTracks(tracks)
    } catch (error) {
      console.error('Error obteniendo tracks:', error)
      setArtistTracks([])
    } finally {
      setLoadingTracks(false)
    }
  }

  const isSelected = (artistId) => selectedArtists.some(a => a.id === artistId)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm mb-4 inline-block hover:underline" style={{ color: 'var(--primary)' }}>
          ← Volver al dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gradient">Selección de Artistas avanzadas</h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Busca y selecciona hasta 5 artistas para tu playlist
        </p>
      </div>

      {/* Artistas seleccionados */}
      {selectedArtists.length > 0 && (
        <div className="card p-4 mb-6">
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            Artistas seleccionados ({selectedArtists.length}/5):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedArtists.map(artist => (
              <div
                key={artist.id}
                onClick={() => toggleArtist(artist)}
                className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {artist.images?.[0] && (
                  <img src={artist.images[0].url} alt={artist.name} className="w-6 h-6 rounded-full" />
                )}
                <span className="text-sm text-white">{artist.name}</span>
                <span className="text-white">×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artistas..."
          className="input text-lg py-4"
          autoFocus
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((artist) => (
          <div
            key={artist.id}
            className={`card p-4 transition-all ${isSelected(artist.id) ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className="flex items-center gap-4">
              {/* Imagen del artista */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-hover)' }}>
                {artist.images?.[0] ? (
                  <img src={artist.images[0].url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>🎤</div>
                )}
              </div>

              {/* Info del artista */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {artist.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {artist.followers?.total?.toLocaleString()} seguidores
                </p>
                {artist.genres?.length > 0 && (
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {artist.genres.slice(0, 2).join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => toggleArtist(artist)}
                disabled={!isSelected(artist.id) && selectedArtists.length >= 5}
                className={`flex-1 py-2 text-sm rounded transition-colors ${
                  isSelected(artist.id) 
                    ? 'bg-green-600 text-white' 
                    : 'btn-primary disabled:opacity-50'
                }`}
              >
                {isSelected(artist.id) ? '✓ Seleccionado' : 'Seleccionar'}
              </button>
              <button 
                onClick={() => handleExpandArtist(artist)}
                className="px-4 py-2 text-sm rounded"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
              >
                {expandedArtist?.id === artist.id ? '▲' : '▼'}
              </button>
            </div>

            {/* Top tracks expandibles */}
            {expandedArtist?.id === artist.id && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--bg-hover)' }}>
                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Top tracks:</p>
                {loadingTracks ? (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cargando...</p>
                ) : (
                  <div className="space-y-2">
                    {artistTracks.slice(0, 5).map(track => (
                      <div 
                        key={track.id}
                        className="flex items-center gap-2 p-2 rounded"
                        style={{ backgroundColor: 'var(--bg-hover)' }}
                      >
                        {track.album?.images?.[0] && (
                          <img src={track.album.images[0].url} alt="" className="w-8 h-8 rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>{track.name}</p>
                        </div>
                        <button
                          onClick={() => addTrack(track)}
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                        >
                          + Añadir
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estado inicial */}
      {!query && results.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-4xl mb-4">🎤</p>
          <p className="text-lg">Escribe el nombre de un artista para buscarlo</p>
        </div>
      )}

      {/* Sin resultados */}
      {query && !loading && results.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">No se encontraron artistas para "{query}"</p>
        </div>
      )}
    </div>
  )
}
