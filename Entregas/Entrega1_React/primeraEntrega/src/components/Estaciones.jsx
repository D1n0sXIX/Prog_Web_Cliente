import Paisaje from "./Paisaje";
import "./Estaciones.css";

export default function Estaciones(){
    const estaciones = [
        {
            nombre: "Verano",
            url: "../../public/Verano.jpg",
        },
        {
            nombre: "Invierno",
            url: "../../public/Invierno.jpg",
        },{
            nombre: "Otoño",
            url: "../../public/Otonio.jpg",
        },{
            nombre: "Primavera",
            url: "../../public/Primavera.jpg",
        },
    ];

        return(
            <section className="galeria">
                <h1 className="galeriaTitle">Estaciones del año</h1>

                <div className="galeriaGrid">
                    {estaciones.map(item => (
                        <Paisaje nombre={item.nombre} url={item.url} key={item.nombre} />
                    ))}
                </div>

            </section>
        );
}