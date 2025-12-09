'use client'
/**
 * ============================================
 * 🏠 DASHBOARD PRINCIPAL
 * ============================================
 * 
 * Según el README del profesor:
 * - El Dashboard maneja el estado de TODOS los widgets
 * - Cada widget recibe props: onSelect, selectedItems
 * - Los widgets emiten cambios al Dashboard (componente padre)
 * - Se genera una playlist basada en las selecciones de los widgets
 */

import { useState } from 'react'
import ArtistWidget from '@/components/widgets/ArtistWidget'
import TrackWidget from '@/components/widgets/TrackWidget'
import GenreWidget from '@/components/widgets/GenreWidget'
import DecadeWidget from '@/components/widgets/DecadeWidget'
import PopularityWidget from '@/components/widgets/PopularityWidget'
import FavoritosWidget from '@/components/widgets/FavoritosWidget'
import { usePlaylist } from '@/context/PlaylistContext'
import { getArtistTopTracks, searchTracks } from '@/lib/spotify'

export default function Dashboard() {
  // ============================================
  // ESTADO CENTRALIZADO DE TODOS LOS WIDGETS
  // El Dashboard es el "padre" que controla todo
  // ============================================
  
  // Obtener funciones del Context para manejar la playlist del footer
  // Y también el estado compartido de artistas/tracks para las páginas expandidas
  const { 
    playlist, 
    setPlaylist, 
    selectedArtists, 
    setSelectedArtists,
    selectedTracks,
    setSelectedTracks
  } = usePlaylist()
  
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedDecades, setSelectedDecades] = useState([])
  const [popularityRange, setPopularityRange] = useState({ min: 0, max: 100 })
  
  // Estado de carga
  const [loading, setLoading] = useState(false)
  
  // ============================================
  // FUNCIONES DE GESTIÓN DE PLAYLIST
  // ============================================

  /**
   * Genera una playlist basada en las selecciones de los widgets
   * Estrategia según el README (endpoint /recommendations deprecado):
   * 1. Obtener top tracks de artistas seleccionados
   * 2. Buscar tracks por género
   * 3. Filtrar por década, popularidad, etc.
   */
  const generatePlaylist = async () => {
    setLoading(true)
    let tracks = []

    try {
      // 1. Obtener tracks de los artistas seleccionados
      for (const artist of selectedArtists) {
        const artistTracks = await getArtistTopTracks(artist.id)
        tracks.push(...artistTracks)
      }

      // 2. Añadir tracks seleccionados directamente
      tracks.push(...selectedTracks)

      // 3. Buscar tracks por género
      for (const genre of selectedGenres) {
        const genreTracks = await searchTracks(`genre:${genre}`, 10)
        tracks.push(...genreTracks)
      }

      // 4. Filtrar por década (año de lanzamiento)
      if (selectedDecades.length > 0) {
        tracks = tracks.filter(track => {
          const year = new Date(track.album?.release_date).getFullYear()
          return selectedDecades.some(decade => 
            year >= decade.start && year <= decade.end
          )
        })
      }

      // 5. Filtrar por popularidad
      tracks = tracks.filter(track => 
        track.popularity >= popularityRange.min && 
        track.popularity <= popularityRange.max
      )

      // 6. Eliminar duplicados por ID
      const uniqueTracks = [...new Map(tracks.map(t => [t.id, t])).values()]

      // 7. Mezclar aleatoriamente y limitar
      const shuffled = uniqueTracks.sort(() => Math.random() - 0.5)
      setPlaylist(shuffled.slice(0, 20))

    } catch (error) {
      console.error('Error generando playlist:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-32"> {/* Espacio para el área de playlist */}
      {/* Título de bienvenida */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient">
          Spotify Taste Mixer
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Utiliza los widgets para generar tu playlist personalizada !!!
        </p>
      </div>

      {/* Grid de Widgets - Cada uno recibe props del padre */}
      {/* Primera fila: Artistas y Canciones (más importantes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Widget de Artistas */}
        <ArtistWidget 
          selectedArtists={selectedArtists}
          onSelect={setSelectedArtists}
        />

        {/* Widget de Canciones/Tracks */}
        <TrackWidget 
          selectedTracks={selectedTracks}
          onSelect={setSelectedTracks}
        />
      </div>

      {/* Segunda fila: Filtros (Décadas, Géneros, Popularidad) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Widget de Décadas */}
        <DecadeWidget 
          selectedDecades={selectedDecades}
          onSelect={setSelectedDecades}
        />

        {/* Widget de Géneros */}
        <GenreWidget 
          selectedGenres={selectedGenres}
          onSelect={setSelectedGenres}
        />

        {/* Widget de Popularidad */}
        <PopularityWidget 
          popularityRange={popularityRange}
          onSelect={setPopularityRange}
        />
      </div>

      {/* Tercera fila: Favoritos */}
      <div className="grid grid-cols-1 mb-8">
        <FavoritosWidget />
      </div>

      {/* Botón para generar playlist */}
      <div className="flex justify-center mb-8">
        <button
          onClick={generatePlaylist}
          disabled={loading || (selectedArtists.length === 0 && selectedTracks.length === 0 && selectedGenres.length === 0)}
          className="btn-primary px-8 py-4 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Generando...' : '🎵 Generar Playlist'}
        </button>
      </div>

      {/* Indicador de que la playlist está en el footer */}
      {playlist.length > 0 && (
        <div className="text-center" style={{ color: 'var(--text-secondary)' }}>
          <p>✨ Tu playlist se muestra en el footer inferior. ¡Despliégalo para verla!</p>
        </div>
      )}
    </div>
  )
}
