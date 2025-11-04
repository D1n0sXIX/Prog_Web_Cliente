import React from "react";
import ToComplete from "./ToComplete";
import ListCheck from "./ListCheck";
import { useFormContext } from "react-hook-form";

export default function MetodoPago() {
    const TIPOSDETARJETA = [
      { value: "visa", label: "Visa" },
      { value: "mastercard", label: "MasterCard" },
      { value: "amex", label: "American Express" },
    ];
    const { watch } = useFormContext();
    const tiposSeleccionados = watch("tipotarjeta");
    
    return (
        <section aria-label="Metodo de pago">
            <ListCheck name="tipotarjeta" label="Tipo de tarjeta" options={TIPOSDETARJETA} />
            <ToComplete
                name ="datostarjeta"
                label="Datos de la tarjeta"
                rules={{ required: "Por favor ingrese los datos de su tarjeta" }}
            />
            {tiposSeleccionados && Array.isArray(tiposSeleccionados) && tiposSeleccionados.length > 0 && (
            <p className="muted">Tipos seleccionados: {tiposSeleccionados.join(", ")}</p>
      )}
        </section>
    );
}