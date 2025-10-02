function descargarTareas() {
    console.log("El boton funciona chachi pistachi");
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(respuesta => respuesta.json())  // Convierto a formato JSON
        .then(datos => {
            // Guardo los datos del JSON
            const contenidoJason = datos;

            // Limpio el contenedor (div) donde se almacenan los "datos"
            const contenedor = document.getElementById("tareas");
            contenedor.innerHTML = "";

            // Solo pide los 10 primeros, por lo que los seleccionamos y mapeamos
            const primeros10 = contenidoJason.slice(0, 10)
                .map(tarea => {
                    const elemento = document.createElement("p");
                    elemento.textContent = tarea.title;
                    return elemento;
                });

            // Añadir los elementos al contenedor
            primeros10.forEach(tareaElement => {
                contenedor.appendChild(tareaElement);
            });
        })
}
