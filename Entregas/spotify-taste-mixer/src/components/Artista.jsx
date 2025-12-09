'use client'

import { useState, useEffect } from 'react'
import { getArtistTopTracks, getArtistAlbums, getAlbumTracks } from '@/lib/spotify'

export default function Artista({ artist, onClose, onAddTrack }) {
  const [topTracks, setTopTracks] = useState([])
  const [albums, setAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [albumTracks, setAlbumTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAlbum, setLoadingAlbum] = useState(false)

  // Cargar top tracks y álbumes del artista
  useEffect(() => {
    async function loadArtistData() {
      setLoading(true)
      try {
        const [tracks, artistAlbums] = await Promise.all([
          getArtistTopTracks(artist.id),
          getArtistAlbums(artist.id, 20)
        ])
        setTopTracks(tracks)
        setAlbums(artistAlbums)
      } catch (error) {
        console.error('Error cargando datos del artista:', error)
      } finally {
        setLoading(false)
      }
    }
    loadArtistData()
  }, [artist.id])

  // Cargar canciones de un álbum seleccionado
  const handleAlbumClick = async (album) => {
    if (selectedAlbum?.id === album.id) {
      setSelectedAlbum(null)
      setAlbumTracks([])
      return
    }
    
    setSelectedAlbum(album)
    setLoadingAlbum(true)
    try {
      const tracks = await getAlbumTracks(album.id)
      // Añadir info del álbum a cada track para mostrar la imagen
      setAlbumTracks(tracks.map(t => ({ ...t, album })))
    } catch (error) {
      console.error('Error cargando tracks del álbum:', error)
    } finally {
      setLoadingAlbum(false)
    }
  }

  // Formatear duración de ms a mm:ss
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="card glow-primary animate-fade-in">
      {/* Header del artista */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-hover)' }}>
            {artist.images?.[0] ? (
              <img src={artist.images[0].url} alt={artist.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🎤</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gradient">{artist.name}</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {artist.followers?.total?.toLocaleString()} seguidores
            </p>
            {artist.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {artist.genres.slice(0, 4).map((genre) => (
                  <span key={genre} className="badge-primary text-xs">{genre}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={onClose} className="btn-accent px-3 py-1 text-sm">
          ✕ Cerrar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>Cargando discografía...</p>
        </div>
      ) : (
        <>
          {/* Top Tracks */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-primary-color">🔥 Canciones Populares</h3>
            <div className="space-y-2">
              {topTracks.slice(0, 5).map((track, index) => (
                <div key={track.id} className="track-item flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center" style={{ color: 'var(--text-muted)' }}>{index + 1}</span>
                    {track.album?.images?.[0] && (
                      <img src={track.album.images[0].url} alt={track.name} className="w-10 h-10 rounded" />
                    )}
                    <div>
                      <p style={{ color: 'var(--text-primary)' }}>{track.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {formatDuration(track.duration_ms)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddTrack(track)}
                    className="btn-primary px-3 py-1 text-xs"
                  >
                    + Añadir a Playlist
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Álbumes */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-color">💿 Discografía</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => handleAlbumClick(album)}
                  className={`cursor-pointer rounded-lg overflow-hidden transition-all ${
                    selectedAlbum?.id === album.id ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: 'var(--bg-hover)' }}
                >
                  {album.images?.[0] && (
                    <img src={album.images[0].url} alt={album.name} className="w-full aspect-square object-cover" />
                  )}
                  <div className="p-2">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {album.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {album.release_date?.split('-')[0]} • {album.album_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracks del álbum seleccionado */}
          {selectedAlbum && (
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-hover)' }}>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                💿 {selectedAlbum.name}
              </h4>
              
              {loadingAlbum ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 mx-auto" style={{ borderColor: 'var(--primary)' }}></div>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {albumTracks.map((track, index) => (
                    <div key={track.id} className="track-item flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{track.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {formatDuration(track.duration_ms)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddTrack({ ...track, album: selectedAlbum, artists: [{ name: artist.name }] })}
                        className="btn-primary px-3 py-1 text-xs"
                      >
                        + Añadir a Playlist
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
