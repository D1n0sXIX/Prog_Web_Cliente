'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const errorParam = searchParams.get('error')

    // Validar CSRF
    const savedState = sessionStorage.getItem('spotify_auth_state')

    if (errorParam) {
      setError(`Error de Spotify: ${errorParam}`)
      return
    }

    if (!state || state !== savedState) {
      setError('Error de validación CSRF. Intenta iniciar sesión de nuevo.')
      return
    }

    if (!code) {
      setError('No se recibió código de autorización.')
      return
    }

    // Intercambiar código por token
    fetch('/api/spotify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
          return
        }

        // Guardar tokens en localStorage
        localStorage.setItem('spotify_token', data.access_token)
        localStorage.setItem('spotify_refresh_token', data.refresh_token)

        const expirationTime = Date.now() + data.expires_in * 1000
        localStorage.setItem('spotify_token_expiration', expirationTime.toString())

        // Limpiar state de sesión
        sessionStorage.removeItem('spotify_auth_state')

        // Redirigir al dashboard
        router.push('/dashboard')
      })
      .catch(err => {
        setError('Error al obtener el token: ' + err.message)
      })
  }, [searchParams, router])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
      <p>Autenticando con Spotify...</p>
    </div>
  )
}
