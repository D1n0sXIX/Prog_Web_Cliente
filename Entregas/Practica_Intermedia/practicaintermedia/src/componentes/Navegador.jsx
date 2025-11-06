import { useForm } from 'react-hook-form'
import './Navegador.css'

export default function Navegador({ onResultados }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Datos de búsqueda:', data)
    onResultados(data)
  }

  return (
    <div className="navegador">
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">

        {/* Input por nombre */}
        <div className="div-busqueda">
          <label htmlFor="nombre"></label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Breaking Bad"
            {...register('nombre')}
            className="input-busqueda"
          />
        </div>

        {/* Input por género */}
        <div className="campo-busqueda">
          <label htmlFor="genero"></label>
          <input
            id="genero"
            type="text"
            placeholder="Genero -> Ej: Drama"
            {...register('genero')}
            className="input-busqueda"
          />
        </div>
        {/* Input por calificación */}
        <div className="campo-busqueda">
          <label htmlFor="calificacion"></label>
          <input
            id="calificacion"
            type="number"
            min="0"
            placeholder="Calificación -> Ej: 10"
            {...register('calificacion')}
            className="input-busqueda"
          />
        </div>
    
        <button type="submit" className="boton-busqueda">Buscar</button>
      </form>
    </div>
  )
}
