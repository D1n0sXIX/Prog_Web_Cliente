import { useState } from 'react'
import Navegador from './componentes/Navegador'
import ListaResultados from './componentes/ListaResultados'
import ListaDeFavoritos from './componentes/ListaDeFavoritos'
import './App.css'

export default function App() {
  const [filtros, setFiltros] = useState({ // Inicializo los arrays de filtros
    nombre: '',
    genero: '',
    calificacion: ''
  })
  const [resultados, setResultados] = useState([]) // Inicializo el array de resultados
  const [cargando, setCargando] = useState(false) // Estado de carga
  const [favoritos, setFavoritos] = useState([])  // Inicializo el array de favoritos

  const addFavorito = (show) => { // Añade una peli/serie al array de favoritos
    if (!show || !show.id) return
    setFavoritos((prev) => {
      const exists = prev.some(f => f.id === show.id)
      if (exists) return prev
      return [...prev, show]
    })
  }

  const removeFavorito = (id) => { // Elimina una peli/serie del array de favoritos
    setFavoritos((prev) => prev.filter(f => f.id !== id))
  }

  const handleResultados = async (datos) => { // Función que controla los resultados que se muestran al buscar
    setFiltros(datos)
    console.log('App recibimos:', datos) // debugging

    // Si no hay ningun filtro, no se busca
    if (!datos.nombre && !datos.genero && !datos.calificacion) {
      setResultados([])
      return
    }

    // Mostrar que estamos cargando -> un extra que tenia cuando usaba el boton pero queda bien
    setCargando(true)
    setResultados([])

    try { // Intentamos buscar en la API
      let resultadosFiltrados = []

      // Si tenemos nombre, buscamos por nombre en la API
      if (datos.nombre) {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(datos.nombre)}`
        )
        const data = await response.json()
        console.log('Resultados de la API (por nombre):', data)
        resultadosFiltrados = data
      } else {
        // Si NO tenemos nombre pero tenemos género o calificación,
        // traemos muchas series y luego filtramos
        const response = await fetch('https://api.tvmaze.com/shows')
        const data = await response.json()
        console.log('Resultados de la API (todas las series):', data)
        resultadosFiltrados = data.map(show => ({ show }))
      }

      // Filtrar por género si existe
      if (datos.genero) {
        resultadosFiltrados = resultadosFiltrados.filter(item =>
          item.show.genres.some(g => 
            g.toLowerCase().includes(datos.genero.toLowerCase())
          )
        )
      }

      // Filtrar por calificación si existe
      if (datos.calificacion) {
        resultadosFiltrados = resultadosFiltrados.filter(item =>
          item.show.rating?.average >= parseFloat(datos.calificacion)
        )
      }

      setResultados(resultadosFiltrados)
    } catch (error) { // Manejo de errores
      console.error('Error al buscar:', error)
      setResultados([])
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="MainDiv">
      <h1>Buscador de Series y Películas</h1>
      <Navegador onResultados={handleResultados} />
      
      <ListaDeFavoritos favoritos={favoritos} onRemove={removeFavorito} />
      
      {cargando && <p className="cargando">Buscando...</p>}

      {resultados.length > 0 && <ListaResultados resultados={resultados} onAddFavorite={addFavorito} />}
    </div>
  )
}

