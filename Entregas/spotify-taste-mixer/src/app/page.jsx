'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSpotifyAuthUrl } from '@/lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Si ya hay token, redirigir al dashboard
    const token = localStorage.getItem('spotify_token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = () => {
    const authUrl = getSpotifyAuthUrl()
    window.location.href = authUrl
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <main className="flex flex-col items-center justify-center text-center px-4">
        <p className="text-xl mb-8 max-w-md" style={{ color: 'var(--text-secondary)' }}>
          Genera playlists personalizadas basándote en tus preferencias musicales !!!
        </p>

        {/* Botón de Login */}
        <button
          onClick={handleLogin}
          className="btn-gradient flex items-center gap-3 px-8 py-4 rounded-full text-lg glow-primary"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Iniciar sesión con Spotify
        </button>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="card hover-glow">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="text-lg font-semibold mb-2 text-primary-color">Elige Artistas o Canciones</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Selecciona tus artistas favoritos para generar playlists</p>
          </div>
          <div className="card hover-glow">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="text-lg font-semibold mb-2 text-accent-color">Selecciona Géneros y en base a tu Mood</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Personaliza el estilo y la energía de tu música</p>
          </div>
          <div className="card hover-glow">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold mb-2 text-primary-color">Guarda Favoritos</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Marca tus canciones favoritas para no perderlas</p>
          </div>
        </div>
      </main>
    </div>
  )
}

