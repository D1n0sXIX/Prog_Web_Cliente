'use client'

/**
 * GENRE WIDGET
 * Según el README:
 * - Recibe props: onSelect, selectedGenres
 * - Emite cambios al componente padre (Dashboard)
 * - Lista de géneros hardcodeada (endpoint deprecated)
 * - Selección múltiple (límite: 3-5 géneros)
 * - Filtrado por búsqueda
 */

import { useState } from 'react'

// Géneros disponibles según el README
const AVAILABLE_GENRES = [
  'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient',
  'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova',
  'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house',
  'children', 'chill', 'classical', 'club', 'comedy',
  'country', 'dance', 'dancehall', 'death-metal', 'deep-house',
  'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub',
  'dubstep', 'edm', 'electro', 'electronic', 'emo',
  'folk', 'forro', 'french', 'funk', 'garage',
  'german', 'gospel', 'goth', 'grindcore', 'groove',
  'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore',
  'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm',
  'indian', 'indie', 'indie-pop', 'industrial', 'iranian',
  'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz',
  'k-pop', 'kids', 'latin', 'latino', 'malay',
  'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno',
  'movies', 'mpb', 'new-age', 'new-release', 'opera',
  'pagode', 'party', 'philippines-opm', 'piano', 'pop',
  'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock',
  'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae',
  'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly',
  'romance', 'sad', 'salsa', 'samba', 'sertanejo',
  'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter',
  'soul', 'soundtracks', 'spanish', 'study', 'summer',
  'swedish', 'synth-pop', 'tango', 'techno', 'trance',
  'trip-hop', 'turkish', 'work-out', 'world-music'
]
 // Componente GenreWidget
export default function GenreWidget({ selectedGenres = [], onSelect }) {
  const [filter, setFilter] = useState('')
  // Filtrar géneros según el input de búsqueda
  const filteredGenres = AVAILABLE_GENRES.filter(genre =>
    genre.toLowerCase().includes(filter.toLowerCase())
  )

  /* Toggle selección de género
   * Comunica el cambio al padre mediante onSelect
   */
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) { // Si ya está, quitarlo
      onSelect(selectedGenres.filter(g => g !== genre)) // Quitar género
    } else if (selectedGenres.length < 5) { // Si no está y hay espacio, añadirlo
      onSelect([...selectedGenres, genre]) // Añadir género
    }
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Géneros</h3>

      <input type="text"
        placeholder="Filtrar géneros..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input mb-3"
      />

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
        {filteredGenres.map(genre => ( // Mapeo de botones de géneros
          <button key={genre} onClick={() => toggleGenre(genre)}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              selectedGenres.includes(genre) ? '' : 'hover:opacity-80' // Efecto hover solo si no está seleccionado
            }`}
            style={selectedGenres.includes(genre) 
              ? { backgroundColor: 'var(--primary)', color: 'white' } // Seleccionado
              : { backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' } // No seleccionado
            }
          >
            {genre}
          </button>
        ))}
      </div>

      {selectedGenres.length > 0 && (
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          Seleccionados: {selectedGenres.join(', ')} ({selectedGenres.length}/5)
        </p>
      )}
    </div>
  )
}
