import "./Paisaje.css";

function Paisaje({ nombre, url }) {
    return (
        <article className="Paisaje">
            <h3 className="PaisajeTitle">{nombre}</h3>
            <img className="PaisajeIMG" src={url} alt={nombre} />
        </article>
    );
}

export default Paisaje;