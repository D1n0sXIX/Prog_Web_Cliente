import React from "react";
import ToComplete from "./ToComplete";

export default function InformacionContacto() {
    return (
        <section aria-label="Información de contacto">
            <ToComplete
                name ="direccion"
                label="Direccion"
                condiciones={{ required: "Por favor ingrese su direccion" }}
            />
            <ToComplete
                name ="ciudad"
                label="Ciudad"
                condiciones={{ required: "Por favor ingrese su ciudad" }}
            />
            <ToComplete
                name ="codigoPostal"
                label="Codigo Postal"
                condiciones={{ required: "Por favor ingrese su código postal" }}
            />

        </section>
    )
}