// ========================
// Guía rapida de JavaScript
// ========================

// ---- Variables ----
var a = 10;            // var (ya casi no se usa, tiene alcance raro)
let b = 20;            // let (alcance de bloque, lo más común)
const c = 30;          // const (no cambia su valor)

// ---- Tipos básicos ----
let texto = "Hola JS"; // string
let numero = 42;       // number
let booleano = true;   // boolean
let nulo = null;       // null
let indef = undefined; // undefined

// ---- Arrays ----
let lista = [1, 2, 3, 4];
console.log("Array:", lista, "Primer elemento:", lista[0]);

// ---- Objetos ----
let persona = {
  nombre: "Ana",
  edad: 25,
  saludar: function() {
    console.log("Hola, soy " + this.nombre);
  }
};
persona.saludar();

// ---- Funciones ----
function sumar(x, y) {
  return x + y;
}
console.log("Suma:", sumar(5, 3));

// Función flecha
const restar = (x, y) => x - y;
console.log("Resta:", restar(10, 4));

// ---- Condicionales ----
if (b > a) {
  console.log("b es mayor que a");
} else {
  console.log("a es mayor o igual que b");
}

// ---- Bucles ----
for (let i = 0; i < lista.length; i++) {
  console.log("Elemento for:", lista[i]);
}

for (let num of lista) {
  console.log("Elemento for...of:", num);
}

lista.forEach((n, i) => {
  console.log("Elemento con forEach:", i, n);
});

// ---- Clases ----
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() {
    console.log(this.nombre + " hace un ruido.");
  }
}

class Perro extends Animal {
  hablar() {
    console.log(this.nombre + " ladra.");
  }
}

let perro = new Perro("Firulais");
perro.hablar();

// ---- Promesas (asincronía) ----
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demoAsync() {
  console.log("Esperando 1 segundo...");
  await esperar(1000);
  console.log("Listo!");
}
demoAsync();
