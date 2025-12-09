'use client'

/**
 * ============================================
 * 💾 PÁGINA DE GUARDAR PLAYLIST
 * ============================================
 * 
 * Esta página muestra un resumen de la playlist antes de guardarla en Spotify.
 * El usuario puede:
 *   - Ver todas las canciones que ha seleccionado
 *   - Escribir un nombre personalizado para la playlist
 *   - Eliminar canciones antes de guardar
 *   - Guardar la playlist en su cuenta de Spotify
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePlaylist } from '@/context/PlaylistContext'
import { createPlaylist, addTracksToPlaylist, getCurrentUser } from '@/lib/spotify'

export default function GuardarPlaylistPage() {
  const router = useRouter()
  const { playlist, removeTrack, clearPlaylist } = usePlaylist()
  
  // Estado para el nombre de la playlist
  const [playlistName, setPlaylistName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedPlaylistUrl, setSavedPlaylistUrl] = useState('')

  // Formatear duración de ms a mm:ss
  const formatDuration = (ms) => {
    if (!ms) return '0:00'
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Calcular duración total de la playlist
  const totalDuration = playlist.reduce((acc, track) => acc + (track.duration_ms || 0), 0)
  const totalMinutes = Math.floor(totalDuration / 60000)

  /**
   * Guardar la playlist en Spotify
   */
  const handleSave = async () => {
    if (playlist.length === 0) return
    
    setSaving(true)
    try {
      // Obtener usuario actual
      const user = await getCurrentUser()
      
      // Usar el nombre personalizado o generar uno por defecto
      const name = playlistName.trim() || `Taste Mixer - ${new Date().toLocaleDateString('es-ES')}`
      
      // Crear la playlist
      const newPlaylist = await createPlaylist(
        user.id,
        name,
        'Playlist generada con Spotify Taste Mixer 🎵'
      )

      // Añadir los tracks
      const trackUris = playlist.map(track => track.uri)
      await addTracksToPlaylist(newPlaylist.id, trackUris)

      // Marcar como guardada y guardar URL
      setSaved(true)
      setSavedPlaylistUrl(newPlaylist.external_urls?.spotify || '')
      
    } catch (error) {
      console.error('Error guardando playlist:', error)
      alert('❌ Error al guardar la playlist. Inténtalo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  // Si no hay canciones, mostrar mensaje
  if (playlist.length === 0 && !saved) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🎵</p>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          No hay canciones en tu playlist
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
          Añade canciones desde los widgets de artistas o canciones
        </p>
        <Link href="/dashboard" className="btn-primary px-6 py-3 rounded-full">
          ← Volver al dashboard
        </Link>
      </div>
    )
  }

  // Si ya se guardó, mostrar mensaje de éxito
  if (saved) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-6">🎉</p>
        <h1 className="text-3xl font-bold text-gradient mb-4">
          ¡Playlist guardada!
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          Tu playlist con {playlist.length} canciones se ha creado en Spotify
        </p>
        
        <div className="flex flex-col items-center gap-4">
          {savedPlaylistUrl && (
            <a 
              href={savedPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-8 py-4 rounded-full text-lg"
            >
              🎧 Abrir en Spotify
            </a>
          )}
          
          <button
            onClick={() => {
              clearPlaylist()
              router.push('/dashboard')
            }}
            className="btn-primary px-6 py-3 rounded-full"
          >
            ✨ Crear otra playlist
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: 'var(--text-muted)' }}>
          ← Volver al dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gradient">💾 Guardar Playlist</h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Revisa tu playlist y dale un nombre antes de guardarla en Spotify
        </p>
      </div>

      {/* Input para el nombre */}
      <div className="card mb-6">
        <label className="block mb-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
          Nombre de la playlist
        </label>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Mi playlist increíble..."
          className="input text-lg"
          autoFocus
        />
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Si lo dejas vacío, se usará "Taste Mixer - {new Date().toLocaleDateString('es-ES')}"
        </p>
      </div>

      {/* Resumen */}
      <div className="flex items-center gap-4 mb-6">
        <span className="badge-primary text-lg px-4 py-2">
          🎵 {playlist.length} canciones
        </span>
        <span className="badge-accent text-lg px-4 py-2">
          ⏱️ {totalMinutes} minutos
        </span>
      </div>

      {/* Lista de canciones */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Canciones
        </h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className="track-item flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 text-center" style={{ color: 'var(--text-muted)' }}>
                  {index + 1}
                </span>
                {track.album?.images?.[0] && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-12 h-12 rounded"
                  />
                )}
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {track.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {track.artists?.map(a => a.name).join(', ')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {formatDuration(track.duration_ms)}
                </span>
                <button
                  onClick={() => removeTrack(track.id)}
                  className="text-accent-color hover:text-accent-light px-2"
                  title="Eliminar de la playlist"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || playlist.length === 0}
          className="btn-gradient px-8 py-4 rounded-full text-lg glow-primary disabled:opacity-50"
        >
          {saving ? '⏳ Guardando en Spotify...' : '💾 Guardar en Spotify'}
        </button>
      </div>
    </div>
  )
}
