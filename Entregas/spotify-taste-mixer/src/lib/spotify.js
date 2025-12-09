// Funciones para interactuar con la API de Spotify

import { getValidToken } from './auth'

const BASE_URL = 'https://api.spotify.com/v1'

/**
 * Hace una petición a la API de Spotify con manejo de errores
 */
async function spotifyFetch(endpoint, options = {}) {
  const token = await getValidToken()

  if (!token) {
    throw new Error('No hay token de acceso válido')
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Busca artistas por nombre
 */
export async function searchArtists(query, limit = 5) {
  const data = await spotifyFetch(
    `/search?type=artist&q=${encodeURIComponent(query)}&limit=${limit}`
  )
  return data.artists?.items || []
}

/**
 * Busca tracks por nombre
 */
export async function searchTracks(query, limit = 10) {
  const data = await spotifyFetch(
    `/search?type=track&q=${encodeURIComponent(query)}&limit=${limit}`
  )
  return data.tracks?.items || []
}

/**
 * Obtiene los top tracks de un artista
 */
export async function getArtistTopTracks(artistId) {
  const data = await spotifyFetch(`/artists/${artistId}/top-tracks?market=ES`)
  return data.tracks || []
}

/**
 * Obtiene los álbumes de un artista
 */
export async function getArtistAlbums(artistId, limit = 20) {
  const data = await spotifyFetch(`/artists/${artistId}/albums?include_groups=album,single&market=ES&limit=${limit}`)
  return data.items || []
}

/**
 * Obtiene las canciones de un álbum
 */
export async function getAlbumTracks(albumId) {
  const data = await spotifyFetch(`/albums/${albumId}/tracks?market=ES&limit=50`)
  return data.items || []
}

/**
 * Obtiene el perfil del usuario actual
 */
export async function getCurrentUser() {
  return spotifyFetch('/me')
}

/**
 * Obtiene los top tracks del usuario
 */
export async function getUserTopTracks(limit = 20, timeRange = 'medium_term') {
  const data = await spotifyFetch(`/me/top/tracks?limit=${limit}&time_range=${timeRange}`)
  return data.items || []
}

/**
 * Obtiene los top artists del usuario
 */
export async function getUserTopArtists(limit = 20, timeRange = 'medium_term') {
  const data = await spotifyFetch(`/me/top/artists?limit=${limit}&time_range=${timeRange}`)
  return data.items || []
}

/**
 * Genera una playlist basada en las preferencias de los widgets
 */
export async function generatePlaylist(preferences) {
  const { artists, genres, decades, mood, popularity } = preferences
  let allTracks = []

  // 1. Obtener tracks de artistas seleccionados
  for (const artist of artists.slice(0, 3)) {
    try {
      const tracks = await getArtistTopTracks(artist.id)
      allTracks.push(...tracks)
    } catch (error) {
      console.error(`Error obteniendo tracks de ${artist.name}:`, error)
    }
  }

  // 2. Buscar tracks por género
  for (const genre of genres.slice(0, 3)) {
    try {
      const data = await spotifyFetch(
        `/search?type=track&q=genre:${encodeURIComponent(genre)}&limit=10`
      )
      allTracks.push(...(data.tracks?.items || []))
    } catch (error) {
      console.error(`Error buscando género ${genre}:`, error)
    }
  }

  // 3. Si hay décadas seleccionadas, buscar por año
  for (const decade of decades.slice(0, 2)) {
    try {
      const year = decade.start + Math.floor(Math.random() * 10)
      const data = await spotifyFetch(
        `/search?type=track&q=year:${year}&limit=10`
      )
      allTracks.push(...(data.tracks?.items || []))
    } catch (error) {
      console.error(`Error buscando década ${decade.label}:`, error)
    }
  }

  // 4. Si no hay preferencias, obtener top tracks del usuario
  if (allTracks.length === 0) {
    try {
      allTracks = await getUserTopTracks(20)
    } catch (error) {
      console.error('Error obteniendo top tracks:', error)
    }
  }

  // 5. Filtrar por popularidad
  allTracks = allTracks.filter(track => {
    if (!track.popularity) return true
    return track.popularity >= popularity.min && track.popularity <= popularity.max
  })

  // 6. Eliminar duplicados
  const uniqueTracks = []
  const seenIds = new Set()

  for (const track of allTracks) {
    if (!seenIds.has(track.id)) {
      seenIds.add(track.id)
      uniqueTracks.push(track)
    }
  }

  // 7. Mezclar aleatoriamente y limitar
  return shuffleArray(uniqueTracks).slice(0, 20)
}

/**
 * Mezcla un array de forma aleatoria (Fisher-Yates)
 */
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Crea una playlist en Spotify
 */
export async function createPlaylist(userId, name, description = '') {
  return spotifyFetch(`/users/${userId}/playlists`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      public: false
    })
  })
}

/**
 * Añade tracks a una playlist
 */
export async function addTracksToPlaylist(playlistId, trackUris) {
  return spotifyFetch(`/playlists/${playlistId}/tracks`, {
    method: 'POST',
    body: JSON.stringify({
      uris: trackUris
    })
  })
}
