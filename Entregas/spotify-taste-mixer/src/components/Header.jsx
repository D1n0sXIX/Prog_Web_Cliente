'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header({ user }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('spotify_token')
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_token_expiration')
    router.push('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-gradient">
          App Web Spotify by Alejandro Mamán López-Mingo INSO3A
        </Link>

        <div className="flex items-center gap-4">
          {user && ( // Mostrar info del usuario si está disponible -> Copilot
            <div className="flex items-center gap-3">
              {user.images?.[0] && ( // Mostrar imagen de perfil si existe -> Copilot
                <img
                  src={user.images[0].url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full"
                  style={{ border: '2px solid var(--primary)' }}
                />
              )}
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{user.display_name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn-accent px-4 py-2 rounded text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}
