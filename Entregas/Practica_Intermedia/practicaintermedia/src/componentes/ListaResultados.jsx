import './ListaResultados.css'

export default function ListaResultados({ resultados }) {
  
  // Si no hay resultados, mostramos un mensaje
  if (!resultados || resultados.length === 0) {
    return <p>No hay resultados para mostrar</p>
  }

  return (
    <div className="lista-resultados">
      <h2>Resultados encontrados: {resultados.length}</h2>
      
      <div className="grid-resultados">
        {resultados.map((item) => (
          <div key={item.show.id} className="tarjeta-serie">
            
            {/* Imagen de la serie */}
            {item.show.image?.medium && (
              <img 
                src={item.show.image.medium} 
                alt={item.show.name}
                className="imagen-serie"
              />
            )}
            
            {/* Contenido de la tarjeta */}
            <div className="contenido-tarjeta">
              <h3>{item.show.name}</h3>
              
              <p className="generos">
                <strong>Géneros:</strong> {item.show.genres.join(', ') || 'N/A'}
              </p>
              
              <p className="rating">
                <strong>Rating:</strong> {item.show.rating?.average ? `${item.show.rating.average}/10` : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
