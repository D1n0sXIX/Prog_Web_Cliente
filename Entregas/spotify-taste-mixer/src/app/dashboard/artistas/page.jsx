'use client'

/**
 * PÁGINA EXPANDIDA DE ARTISTAS
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
  const [query, setQuery] = useState('') // Texto de búsqueda
  const [results, setResults] = useState([]) // Resultados de búsqueda
  const [loading, setLoading] = useState(false) // Estado de carga
  const [expandedArtist, setExpandedArtist] = useState(null) // Artista expandido
  const [artistTracks, setArtistTracks] = useState([]) // Top tracks del artista expandido
  const [loadingTracks, setLoadingTracks] = useState(false) // Carga de tracks

  // Obtener el estado compartido del Context
  const { selectedArtists, setSelectedArtists, addTrack } = usePlaylist()

  // Buscar artistas cuando cambia el query (con debounce)
  useEffect(() => {
    if (!query.trim()) { // Si el query está vacío, limpiar resultados
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => { // Debounce de 300ms
      setLoading(true)
      try { // Buscar artistas en la API
        const artists = await searchArtists(query, 12)
        setResults(artists)
      } catch (error) { // Manejo de errores
        console.error('Error buscando artistas:', error)
        setResults([])
      } finally { // Siempre quitar estado de carga
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId) // Limpiar timeout al desmontar o cambiar query
  }, [query]) // Fin useEffect

  //Toggle selección de artista
  const toggleArtist = (artist) => {
    const exists = selectedArtists.find(a => a.id === artist.id) // Verificar si ya está seleccionado
    if (exists) { // Quitar artista
      setSelectedArtists(selectedArtists.filter(a => a.id !== artist.id)) // Actualizar estado compartido
    } else if (selectedArtists.length < 5) { // Añadir artista (pilla el top 5)
      setSelectedArtists([...selectedArtists, artist])
    }
  }

  //Expandir artista para ver sus top tracks
  const handleExpandArtist = async (artist) => { // Si ya está expandido, colapsar
    if (expandedArtist?.id === artist.id) { // Si ya está expandido, colapsar -> Copilot
      setExpandedArtist(null)
      setArtistTracks([])
      return
    }
    // Expandir nuevo artista y cargar sus top tracks
    setExpandedArtist(artist)
    setLoadingTracks(true)
    try { // Obtener top tracks del artista
      const tracks = await getArtistTopTracks(artist.id)
      setArtistTracks(tracks)
    } catch (error) { // Manejo de errores
      console.error('Error obteniendo tracks:', error)
      setArtistTracks([])
    } finally {
      setLoadingTracks(false) // Quitar estado de carga
    }
  }
// Verificar si un artista está seleccionado
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

      {/* Input de búsqueda */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Actualizar query al escribir
          placeholder="Buscar artistas..."
          className="input text-lg py-4"
          autoFocus
        />
        {loading && ( // Indicador de carga -> copilot
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((artist) => ( // Mapeo de resultados
          <div
            key={artist.id}
            className={`card p-4 transition-all ${isSelected(artist.id) ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className="flex items-center gap-4">
              {/* Imagen del artista */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-hover)' }}>
                {artist.images?.[0] ? ( // Mostrar imagen SI existe
                  <img src={artist.images[0].url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}></div>
                )}
              </div>

              {/* Info del artista */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {artist.name}
                </h3>
                
                {/* Información adicional */}
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
                disabled={!isSelected(artist.id) && selectedArtists.length >= 5} // Deshabilitar si no está seleccionado y ya hay 5
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
            {expandedArtist?.id === artist.id && ( // Mostrar si está expandido
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--bg-hover)' }}>
                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Top tracks:</p>
                {loadingTracks ? ( // Indicador de carga -> copilot
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cargando...</p>
                ) : ( // Listado de tracks
                  <div className="space-y-2">
                    {artistTracks.slice(0, 5).map(track => (
                      <div key={track.id}
                        className="flex items-center gap-2 p-2 rounded"
                        style={{ backgroundColor: 'var(--bg-hover)' }}
                      >
                        {track.album?.images?.[0] && ( // Imagen del álbum
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
      {!query && results.length === 0 && ( // Si no hay búsqueda
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">Escribe el nombre de un artista para buscarlo</p>
        </div>
      )}

      {/* Sin resultados */}
      {query && !loading && results.length === 0 && ( // Si no hay resultados
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">No se encontraron artistas para "{query}"</p>
        </div>
      )}
    </div>
  )
}
