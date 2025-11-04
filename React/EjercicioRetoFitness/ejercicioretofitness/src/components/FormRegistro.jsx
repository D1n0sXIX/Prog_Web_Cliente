import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import DatosPersonales from "./compFormuario/DatosPersonales";
import InformacionContacto from "./compFormuario/InformacionContacto";
import Preferencias from "./compFormuario/Preferencias";
import MetodoPago from "./compFormuario/MetodoPago";

export default function FormularioRegistro({ onDataSubmit }) {
    const methods = useForm({
        defaultValues: {
            nombre: "",
            email: "",
            telefono: "",
        },
        mode: "onBlur",
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (data) => {
        // DEBUGGING --> Mostramos en consola para comprobar que funciona
        console.log("Datos del formulario:", data);
        // Llamar al callback del padre para mostrar los datos en la UI
        if (typeof onDataSubmit === "function") onDataSubmit(data);
    };

    return (
        <div className="Formalariobase">
            <h2>Formulario de Registro</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <DatosPersonales />
                    <InformacionContacto />
                    <Preferencias />
                    <MetodoPago />
                    <div className="form-actions">
                        <button type="submit" className="boton-primary">Continuar</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}