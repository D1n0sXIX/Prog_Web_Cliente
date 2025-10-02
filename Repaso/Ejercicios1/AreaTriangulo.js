function calcularArea(){
    let base = parseFloat(document.getElementById("pregunta1").value);

    let altura = parseFloat(document.getElementById("pregunta2").value);

    if(base <= 0 || altura <= 0 || isNaN(base) || isNaN(altura) ){
        alert("El input introducido no es valido")
        return;
    }
    else{
        let area = (base * altura)/2;
        document.querySelector("#resultado").innerText = "El Area del triangulo es = " + area.toFixed(2);
    }
    
}

function borrarCampos(){
    document.querySelector("#pregunta1").value = '';
    document.querySelector("#pregunta2").value = '';
    document.querySelector("#resultado").value = '';

}