import ToComplete from "./ToComplete";

export default function DatosPersonales() {
	return (
		<section aria-label="Datos personales">
			<ToComplete
				name="nombre"
				label="Nombre"
				condiciones={{ required: "Por favor introduce tu nombre"}}
			/>

			<ToComplete
				name="email"
				label="Email"
				type="email"
				condiciones={{ required: "El email es obligatorio"}}
			/>

			<ToComplete
				name="telefono"
				label="Numero de telefono"
				condiciones={{ required: "Introduce un numero de telefono valido por favor"}}
			/>
		</section>
	);
}

