document.addEventListener('DOMContentLoaded', () => {
    // Obtener el formulario, campo de texto y el div donde se agregarán las tareas
    const formulario = document.getElementById('formulario');
    const inputString = document.getElementById('inputString');
    const tareasDiv = document.getElementById('tareas');

    // Cuando el formulario se envíe
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();  // Evitar que el formulario recargue la página

        // Obtener el valor que el usuario ha escrito en el input
        const tarea = inputString.value;

        // Si la tarea no está vacía, la mostramos
        if (tarea.trim() !== '') {
            const nuevoElemento = document.createElement('div');  // Crear un nuevo contenedor para la tarea
            nuevoElemento.classList.add('tarea');  // Añadir una clase CSS (opcional)

            // Crear el párrafo con el texto de la tarea
            const textoTarea = document.createElement('p');
            textoTarea.textContent = tarea;
            nuevoElemento.appendChild(textoTarea);  // Añadir el texto de la tarea al contenedor

            // Crear el botón de completar
            const botonCompletar = document.createElement('button');
            botonCompletar.textContent = 'Completar';  // Botón para completar (no hace nada por ahora)
            botonCompletar.classList.add('completar');  // Añadir clase para poder estilizar (opcional)
            nuevoElemento.appendChild(botonCompletar);  // Añadir el botón de completar

            // Crear el botón de eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';  // Botón para eliminar
            botonEliminar.classList.add('eliminar');  // Añadir clase para poder estilizar (opcional)
            nuevoElemento.appendChild(botonEliminar);  // Añadir el botón de eliminar

            // Agregar el nuevo elemento (con los botones) al div de tareas
            tareasDiv.appendChild(nuevoElemento);

            // Limpiar el campo de texto
            inputString.value = '';

            // Funcionalidad del botón de eliminar
            botonEliminar.addEventListener('click', function() {
                tareasDiv.removeChild(nuevoElemento);  // Eliminar el contenedor de la tarea
            });

            // Funcionalidad del botón de completar
            botonCompletar.addEventListener('click', function() {
                // Cambiar el color del texto a verde
                textoTarea.classList.add('completada');
                
                // Eliminar los botones
                botonCompletar.style.display = 'none';
                botonEliminar.style.display = 'none';
            });
        }
    });
});
