import { useState } from 'react'
import Navegador from './componentes/Navegador'
import ListaResultados from './componentes/ListaResultados'
import './App.css'

export default function App() {
  const [filtros, setFiltros] = useState({
    nombre: '',
    genero: '',
    calificacion: ''
  })
  const [resultados, setResultados] = useState([])
  const [cargando, setCargando] = useState(false)

  const handleResultados = async (datos) => {
    setFiltros(datos)
    console.log('App recibimos:', datos)

    // Si no hay ningun filtro, no se buscan
    if (!datos.nombre && !datos.genero && !datos.calificacion) {
      setResultados([])
      return
    }

    // Mostrar que estamos cargando
    setCargando(true)
    setResultados([])

    try {
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
    } catch (error) {
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
      
      {(filtros.nombre || filtros.genero || filtros.calificacion) && (
        <div className="resumen-busqueda">
          <h2>Datos introducidos para la busqueda :</h2>
          {filtros.nombre && <p><strong>Nombre: </strong> {filtros.nombre}</p>}
          {filtros.genero && <p><strong>Genero: </strong> {filtros.genero}</p>}
          {filtros.calificacion && <p><strong>Calificación minima: </strong> {filtros.calificacion}</p>}
        </div>
      )}
      
      {cargando && <p className="cargando">Buscando...</p>}

      {resultados.length > 0 && <ListaResultados resultados={resultados} />}
    </div>
  )
}

