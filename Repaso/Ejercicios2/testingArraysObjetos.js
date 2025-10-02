// Prueba 1
const miArray = ["Alex", "Manu", "jorge", 1, 3, 4];
console.log(miArray[10]);
miArray[10] = 10;
console.log(miArray);
///////////////////////////////////////////////////////////
// Prueba 2
const estudiantes = ["Manu", "Alex", "Rodrigo", "David"];

const chicosINSO = estudiantes.map(estudiantes =>{
    return{
        name: estudiantes,
        group: "INSOA"
    }
});

console.log(chicosINSO);
///////////////////////////////////////////////////////////
// Prueba 3
const orgArray = [0, 7, 3, 2, 8];
const expArray = orgArray.map(orgArray => orgArray*2);

console.log(expArray);
///////////////////////////////////////////////////////////
// Prueba 4
const original = [1, -4, -3, 2, 8, "12"];
const numPositivos = original.filter (item => item > 0);

console.log(numPositivos);
///////////////////////////////////////////////////////////
// Prueba 5
const clases = [{name: 'Marc', group: 'INSOA'},
    {name: 'Rachel', group: 'INSG'},
    {name: 'jonh', group: 'INSG'},
    {name: 'Rachel', group: 'INSOB'}];

const claseFlitrada = clases.filter(item => item.group === 'INSG');

console.log(claseFlitrada);
///////////////////////////////////////////////////////////
// Prueba 6
const buscaRachel = clases.find(item => item.name === 'Rachel') // Solo devuelbe el primer elemento que cumple la condicion
console.log(buscaRachel);

///////////////////////////////////////////////////////////
// Prueba 7
clases.forEach(
    (item, index) => console.log(`${index}: ${item.name}`));

///////////////////////////////////////////////////////////
// pruebas 8
const alumnos = {nombre: 'John', age: 21, group: 'groupA'};
const {nombre, group} = alumnos;
console.log(nombre)
const numeros = [1, 5, 3, 7];
const [firstN, secondN, thirdN, fourthN] = numeros;
console.log(numeros);

///////////////////////////////////////////////////////////
// pruebas 9 Spread Operator !!!
//const groupc = ['Maya', 'Mary', 'Tom'];
//const students = ['Marc', 'Rachel', ]

// Ejercicios

// Ej 1
// Definir un array con 5 números
const misNumeros = [10, 20, 30, 40, 50];

// Crear una copia usando el spread operator
const copiaNumeros = [...misNumeros];

// Modificar el array original
misNumeros[0] = 99;
misNumeros[1] = 88;

// Modificar la copia
copiaNumeros[0] = 11;
copiaNumeros[1] = 22;

// Imprimir ambos arrays
console.log("Array original:", numeros);
console.log("Copia modificada:", copiaNumeros);

// Ej 2
// Definimos un array de objetos
const coches = [
  { nombre: "BMW", color: "Rojo" },
  { nombre: "Peugeot", color: "Amarillo" },
  { nombre: "Lamborghini", color: "Morado" }
];

// Creamos una copia con spread y añadimos un objeto nuevo en la misma operación
const copiaCoches = [...coches, { nombre: "Volvo", color: "Negro" }];

// Modificamos los nombres de cualquier objeto
coches[0].nombre = "BMW Serie 3";
copiaCoches[3].nombre = "Volvo XC90";

// Imprimimos ambos arrays
console.log("Array original:", coches);
console.log("Copia con nuevo objeto:", copiaCoches);

