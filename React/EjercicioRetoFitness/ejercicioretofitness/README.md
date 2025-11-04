 # FitLife

En FitLife queremos ayudarte a alcanzar tus metas de fitness de forma divertida y
sostenible. Este repositorio contiene el enunciado y la guía para crear un formulario
de registro moderno y accesible para nuevos miembros.

## Misión

Desarrollar un formulario de registro intuitivo y atractivo para que los nuevos
miembros puedan unirse a FitLife con facilidad. El formulario debe ser fácil de usar y
reflejar la vibra moderna y acogedora del gimnasio.

## Requisitos principales

1. Componentes

	- Crear componentes reutilizables para cada sección del formulario (DatosPersonales(nombre,  correo electronico, telefono), InformacionContacto(direccion, ciudad, codigo postal), PreferenciasDeEntrenamiento(Tipo de entrenamiento, objetivos y disponibilidad), DatosDePago(metodo de pago, informaccion de la trjeta))
	- Implementar la lógica de cada sección como un componente independiente.

2. Props y state

	- Pasar datos entre componentes usando props.
	- Gestionar el estado interno de cada componente con React `useState`.

3. Manejo de eventos y validación

	- Validación en tiempo real de los campos.
	- Mostrar mensajes de error y de éxito de manera clara.

4. Comunicación hijo → padre

	- Enviar datos parciales desde componentes hijos al componente padre al completar
	  secciones o el formulario completo.

5. Condicionales y listas

	- Mostrar u ocultar campos según las opciones del usuario.
	- Mostrar una lista (dinámica) de opciones de entrenamiento disponibles.

6. Estilos y CSS

	- Aplicar estilos CSS para una interfaz atractiva.
	- Usar clases CSS para estados (activo, inactivo, error).
	- Implementar estilos dinámicos según la selección del usuario.
	- Opcional: usar Styled Components y/o CSS Modules para organización y evitar
	  colisiones de nombres.

7. Peticiones HTTP

	- Enviar los datos del formulario al servidor para registrar al nuevo miembro.

8. Librerías recomendadas

	- Implementar una librería de gestión de formularios como Formik o React Hook Form
	  para facilitar la validación y el manejo de errores.

## Recursos

	- Documentación de React: https://es.reactjs.org/docs/
	- Formik: https://formik.org/
	- React Hook Form: https://react-hook-form.com/

## Consejos rápidos

	- Divide el formulario en secciones pequeñas y manejables.
	- Comienza con una versión simple y añade funcionalidades gradualmente.
	- Prueba con distintos casos de uso (campos vacíos, formatos erróneos, envío lento).
	- Pide feedback a compañeros o profesores para mejorar la UX.

## Guía paso a paso para realizar el ejercicio

1. Planificación y diseño

	- Definir las secciones del formulario:
			• Datos personales (nombre, correo electrónico, teléfono)
			• Información de contacto (dirección, ciudad, código postal)
			• Preferencias de entrenamiento (tipo de entrenamiento, objetivos,
			  disponibilidad)
			• Datos de pago (método de pago, información de la tarjeta) — opcional

	- Diseñar la interfaz:
		- Elegir paleta de colores y tipografía acorde a la marca FitLife.
		- Crear un diseño claro y accesible para cada sección.
		- Incluir imágenes o vídeo opcionales para contextualizar el gimnasio.

2. Implementación con React

	- Componentes:
		- Crear un componente principal (`FormRegistro`) que contenga las secciones.
		- Crear componentes independientes por sección (p. ej. `DatosPersonales`,
		  `Contacto`, `Preferencias`).

	- Props y state:
		- Cada sección puede manejar su propio estado local y enviar datos al padre
		  cuando se avance o complete.

	- Manejo de eventos:
		- Validación en tiempo real y mensajes inline.
		- Botón de envío que compile los datos y lance la petición HTTP.

3. Funcionalidades avanzadas

	- Comunicación hijo-padre: los hijos envían datos validados al padre mediante una
	  función `onChange` o `onComplete` pasada por props.
	- Mostrar/ocultar campos según opciones del usuario (condicionales).
	- Listar dinámicamente opciones de entrenamiento (desde un array o petición).

4. Integración de librerías de formularios

	- Recomiendo React Hook Form por su ligereza y buena integración con componentes
	  controlados y no controlados.
	- Configurar reglas de validación y mostrar mensajes personalizados.

5. Peticiones HTTP

	- Implementar una función que envíe los datos al backend (fetch/axios).
	- Manejar estados de envío: cargando, éxito, error.
	- Mostrar feedback al usuario tras la respuesta del servidor.

## Checklist de entrega

	- [ ] Componentes por sección implementados
	- [ ] Validaciones en tiempo real funcionando
	- [ ] Comunicación hijo → padre implementada
	- [ ] Estilos aplicados (CSS Modules o Styled Components opcional)
	- [ ] Envío de datos al servidor (simulado o real)

---

Si quieres, puedo además:

	- Crear una estructura inicial de componentes en `src/`.
	- Implementar el formulario con React Hook Form y validaciones básicas.
	- Añadir ejemplos de CSS Modules o Styled Components.

Dime qué prefieres y lo hago a continuación.