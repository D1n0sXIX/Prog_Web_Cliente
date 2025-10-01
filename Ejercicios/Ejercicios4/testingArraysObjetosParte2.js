
//////////////////////////////////////////////
// Crar un array de tipos mixtos, quitar los numeros pares
// multiplicarlos x2 y sumar todos los resultados
console.log("//////////////////////////////////////////////")
console.log("Ejercicio 1")
const miArray = [2, 3, "4", 7, "2", 3, "9", 8];
const arrayFiltrado = miArray.filter(item => typeof item === 'number' &&  item % 2 === 0);
console.log(arrayFiltrado);
const arrayMultiplicado = arrayFiltrado.map(item => item*2);
console.log(arrayMultiplicado); 
// Lo suyo es sin usar 3 variables -> concatenar los . como:
/*
const miArray = [2, 3, "4", 7, "2", 3, "9", 8];
const arrayFiltrado = miArray.filter(item => typeof item === 'number' &&  item % 2 === 0)
.map(item => item*2);
.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
*/
console.log("sumatorio de los elementos = " + arrayMultiplicado.reduce((acumulador, valorActual) => acumulador + valorActual, 0));
//////////////////////////////////////////////
// Combinar varios arrays de numeros usando el operador spread
// eliminia los dupliados, y despues calcula 
// la media de todos los numeros
console.log("//////////////////////////////////////////////")
console.log("Ejercicio 2")
const arrayCombinado = [...miArray, ...arrayFiltrado, ...arrayMultiplicado];
console.log(arrayCombinado);
const arraySinDuplicados = [...new Set(arrayCombinado)];
console.log(arraySinDuplicados);
const tamArray = arraySinDuplicados.length
console.log(tamArray);
let sumValores = arraySinDuplicados.reduce((acumulador, valorActual) => acumulador + Number(valorActual), 0);
console.log("Media es = " + sumValores/tamArray);

//////////////////////////////////////////////
// Tenemos un array de objetos, cada uno representa un libro
// con propiedades como autos, titulo, año y precio
// Crea una funcion que filtre y ordene los libros por precio
// y devuelve los libros seleccionadeos con titulo y autor
// La funcionrecive una lista separada por comas separasdas 
// la lista de libros
console.log("//////////////////////////////////////////////")
console.log("Ejercicio 3")
const listaDeLibros = [
  {titulo: "1984", autor: "George Orwell", anio: 1949, precio: 15.99},
  {titulo: "Cien años de soledad", autor: "Gabriel García Márquez", anio: 1967, precio: 12.50},
  {titulo: "El gran Gatsby", autor: "F. Scott Fitzgerald", anio: 1925, precio: 10.75},
  {titulo: "Matar a un ruiseñor", autor: "Harper Lee", anio: 1960, precio: 14.99},
  {titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", anio: 1605, precio: 20.00},
  {titulo: "Fahrenheit 451", autor: "Ray Bradbury", anio: 1953, precio: 9.99},
  {titulo: "Orgullo y prejuicio", autor: "Jane Austen", anio: 1813, precio: 11.50}
];
// Ingresamos el input del usuario
const intput = "Matar a un Ruiseñor,Cien años de soledad,Don Quijote de la Mancha,Orgullo y prejuicio"
const inputArray = intput.split(",");
console.log(inputArray);

console.log(ordenarPorPrecio());

function ordenarPorPrecio(){
    const arrayOrdenado = selectorLibros().sort((a,b) => a.precio - b.precio);

    return arrayOrdenado.map(libro => ({
        titulo: libro.titulo,
        autor: libro.autor
    }));

}

function selectorLibros(){
    const arrayFiltrado = listaDeLibros.filter(libro => inputArray.includes(libro.titulo));
    return arrayFiltrado;
}