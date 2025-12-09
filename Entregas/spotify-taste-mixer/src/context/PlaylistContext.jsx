'use client'

/**
 * ============================================
 * 🎵 PLAYLIST CONTEXT
 * ============================================
 * 
 * Este archivo crea un Context de React para compartir el estado de la playlist
 * entre todos los componentes de la aplicación.
 * Explicacion para estudio:
 * 
 * ¿Por qué necesitamos un Context?
 * --------------------------------
 * En React, los datos fluyen de padres a hijos mediante props.
 * Pero en Next.js con App Router, el layout.jsx renderiza {children}
 * y NO puede pasarle props directamente a las páginas hijas.
 * 
 * El problema:
 *   layout.jsx tiene el estado: const [playlist, setPlaylist] = useState([])
 *   Pero artistas/page.jsx y canciones/page.jsx no pueden acceder a setPlaylist
 * 
 * La solución: React Context
 * --------------------------
 * 1. Creamos un Context con createContext()
 * 2. Creamos un Provider que envuelve la app y provee el estado
 * 3. Las páginas hijas usan useContext() para acceder al estado
 * 
 * Flujo:
 *   PlaylistProvider (en layout.jsx)
 *       ↓ provee: { playlist, addTrack, removeTrack }
 *   Cualquier componente hijo
 *       ↓ usa: usePlaylist() → obtiene { playlist, addTrack, removeTrack }
 */

import { createContext, useContext, useState, useEffect } from 'react'

// 1. Crear el Context
// Este objeto será el "contenedor" que compartirá los datos
const PlaylistContext = createContext(null)

/**
 * 2. Provider Component
 * Este componente envuelve la aplicación y provee el estado a todos los hijos
 */
export function PlaylistProvider({ children }) {
  // Estado de la playlist - array de tracks
  const [playlist, setPlaylist] = useState([])
  
  // Estado de favoritos - se guarda en localStorage
  const [favorites, setFavorites] = useState([])
  
  // ============================================
  // ESTADO COMPARTIDO DE WIDGETS
  // Para que las páginas expandidas usen el mismo estado
  // ============================================
  const [selectedArtists, setSelectedArtists] = useState([])
  const [selectedTracks, setSelectedTracks] = useState([])
  
  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorite_tracks')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error('Error cargando favoritos:', e)
      }
    }
  }, [])

  /**
   * Añadir un track a la playlist
   * Evita duplicados comprobando si el track ya existe
   */
  const addTrack = (track) => {
    setPlaylist(prev => {
      // Comprobar si el track ya está en la playlist
      const exists = prev.some(t => t.id === track.id)
      if (exists) {
        console.log(`"${track.name}" ya está en la playlist`)
        return prev // No añadir duplicados
      }
      console.log(`✅ Añadido: "${track.name}"`)
      return [...prev, track]
    })
  }

  /**
   * Eliminar un track de la playlist por su ID
   */
  const removeTrack = (trackId) => {
    setPlaylist(prev => prev.filter(t => t.id !== trackId))
  }

  /**
   * Limpiar toda la playlist
   */
  const clearPlaylist = () => {
    setPlaylist([])
  }

  /**
   * Toggle favorito - añadir/quitar de favoritos (OBLIGATORIO según README)
   */
  const toggleFavorite = (track) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === track.id)
      let updated
      
      if (exists) {
        updated = prev.filter(f => f.id !== track.id)
        console.log(`❌ Eliminado de favoritos: "${track.name}"`)
      } else {
        updated = [...prev, track]
        console.log(`⭐ Añadido a favoritos: "${track.name}"`)
      }
      
      // Guardar en localStorage
      localStorage.setItem('favorite_tracks', JSON.stringify(updated))
      return updated
    })
  }

  /**
   * Verificar si un track es favorito
   */
  const isFavorite = (trackId) => {
    return favorites.some(f => f.id === trackId)
  }

  // El valor que se comparte con todos los componentes hijos
  const value = {
    playlist,        // Array de tracks actuales
    addTrack,        // Función para añadir
    removeTrack,     // Función para eliminar
    clearPlaylist,   // Función para limpiar todo
    setPlaylist,     // Función directa para casos especiales
    favorites,       // Array de tracks favoritos
    toggleFavorite,  // Función para toggle favorito
    isFavorite,      // Función para verificar si es favorito
    // Estado compartido de widgets
    selectedArtists,
    setSelectedArtists,
    selectedTracks,
    setSelectedTracks
  }

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

/**
 * 3. Custom Hook para usar el Context
 * 
 * En lugar de hacer useContext(PlaylistContext) en cada componente,
 * creamos un hook personalizado que:
 *   - Es más limpio de usar: usePlaylist()
 *   - Incluye validación de errores
 */
export function usePlaylist() {
  const context = useContext(PlaylistContext)
  
  // Si se usa fuera del Provider, lanzar error descriptivo
  if (!context) {
    throw new Error(
      'usePlaylist debe usarse dentro de un PlaylistProvider. ' +
      'Asegúrate de que el componente está envuelto por el Provider en layout.jsx'
    )
  }
  
  return context
}
