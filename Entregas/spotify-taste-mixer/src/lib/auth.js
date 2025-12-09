// Utilidades de autenticación para Spotify OAuth

/**
 * Genera una cadena aleatoria para el state de OAuth (CSRF protection)
 */
export function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

/**
 * Genera la URL de autorización de Spotify
 */
export function getSpotifyAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI

  const state = generateRandomString(16)
  sessionStorage.setItem('spotify_auth_state', state)

  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state: state
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

/**
 * Obtiene el token de acceso desde localStorage
 */
export function getAccessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('spotify_token')
}

/**
 * Verifica si el token ha expirado
 */
export function isTokenExpired() {
  const expiration = localStorage.getItem('spotify_token_expiration')
  if (!expiration) return true
  return Date.now() > parseInt(expiration)
}

/**
 * Refresca el token de acceso
 */
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  if (!refreshToken) return null

  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    })

    const data = await response.json()

    if (data.error) {
      console.error('Error refreshing token:', data.error)
      return null
    }

    localStorage.setItem('spotify_token', data.access_token)
    const expirationTime = Date.now() + data.expires_in * 1000
    localStorage.setItem('spotify_token_expiration', expirationTime.toString())

    return data.access_token
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}

/**
 * Obtiene un token válido, refrescando si es necesario
 */
export async function getValidToken() {
  if (isTokenExpired()) {
    return await refreshAccessToken()
  }
  return getAccessToken()
}
