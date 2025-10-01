function descargarTareas() {
    // Solicitud a la API
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(respuesta => respuesta.json())  // Conveierto a formato JSON
        .then(datos => {
            // Guardo los datos
            const contenidoJason = datos;

            // Limpio el contenedor (div) donde se almacenan los "datos"
            const contenedor = document.getElementById("tareas");
            contenedor.innerHTML = "";

            // Podria hacer un for each pero como me piden solo los 10 primeros hago un for tradicional
            for (let i = 0; i < 10; i++) {
                
                const tarea = contenidoJason[i];
                // Creo un elemento HTML para almacenar tarea
                const tareaElement = document.createElement("p");
                tareaElement.textContent = tarea.title;  // Asignar el titulo

                // Añado el nuevo elemento al contenedor
                contenedor.appendChild(tareaElement);
            }
        })
}

// Añadir el evento al boton
document.querySelector("button").addEventListener("click", descargarTareas);
