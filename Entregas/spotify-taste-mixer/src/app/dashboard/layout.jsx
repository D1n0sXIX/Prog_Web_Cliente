'use client'

/**
 * ============================================
 * 🎵 DASHBOARD LAYOUT
 * ============================================
 * 
 * Este layout envuelve todas las páginas del dashboard.
 * Incluye:
 *   - Header (navegación superior)
 *   - PlaylistProvider (Context para compartir la playlist)
 *   - PlaylistFooter (footer fijo con la playlist)
 * 
 * Gracias al PlaylistProvider, cualquier página hija puede:
 *   - Leer la playlist actual
 *   - Añadir tracks con addTrack()
 *   - Eliminar tracks con removeTrack()
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import PlaylistFooter from '@/components/PlaylistFooter'
import { PlaylistProvider } from '@/context/PlaylistContext'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar autenticación y cargar usuario
  useEffect(() => {
    const token = localStorage.getItem('spotify_token')
    if (!token) {
      router.push('/')
      return
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Token inválido')
        return res.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('spotify_token')
        router.push('/')
      })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }}></div>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    // PlaylistProvider envuelve todo para que las páginas hijas
    // puedan acceder al estado de la playlist mediante usePlaylist()
    <PlaylistProvider>
      <div className="min-h-screen bg-dark flex flex-col">
        <Header user={user} />
        
        {/* Contenido principal - con padding para el footer */}
        <main className="flex-1 container mx-auto px-4 py-8 pt-20 pb-80">
          {children}
        </main>

        {/* Footer fijo con la playlist */}
        <PlaylistFooter />
      </div>
    </PlaylistProvider>
  )
}
