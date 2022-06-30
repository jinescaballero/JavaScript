//objetivos:
/*Utilizar DOM para modificar datos en el index
Utilizar evetos*/
const formulario = document.querySelector("#formulario");


//funciones
function calcularCuota(meses,monto) {
    switch (true){
        case meses==3: 
        return Math.round( monto * 1.15 /3);
        // return prestamo.cuota //cuota :  20166  total 121.194  21%
        break  
        case meses==6: 
            return Math.round( monto * 1.21 /6);
            // return prestamo.cuota //cuota :  20166  total 121.194  21%
            break      
        case meses==12: 
            return  Math.round( monto * 1.46 /12);
           //cuota 12166  total 146.000   46%
            break;
        
        case  meses==24:
            return Math.round( monto * 1.84/24);
            // cuota 7666 total 184.000  84%
            break;
        case  meses==36:
            return Match.round( monto * 2.33 /36);
            // cuota 6494 total 233784  133%
            break;
    
}
}
function validarFormulario(e){
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value;
    let monto = document.querySelector("#monto").value;
    let plazo = document.querySelector("#plazo").value;
    const listado = document.getElementById("listado");
    cargarDatos(prestamo);
    listado.textContent =  `${bienvenida} ! Elegiste Prestamo ${prestamo.tipo} por $${monto}, ${prestamo.plazo} cuotas de  $${prestamo.cuota}. 
    Total a devolver. $${prestamo.total}` ;
    localStorage.setItem('bienvenida',`Bienvenida ${prestamo.nombre}`); 

}   


function cargarDatos(prestamo){
    prestamo.nombre = document.querySelector("#nombre").value;
    prestamo.monto = document.querySelector("#monto").value;
    prestamo.plazo = document.querySelector("#plazo").value;
    prestamo.tipo = validarButton();
    prestamo.cuota = calcularCuota(prestamo.plazo, prestamo.monto);
    prestamo.total= prestamo.cuota * prestamo.plazo;
    console.log(prestamo);

}   


class PrestamoClass {
    constructor(nombre, monto,plazo,tipo){
    this.nombre = nombre;
    this.monto = monto;
    this.plazo=plazo;
    this.cuota=0;
    this.tipo='';
    this.total=this.plazo*this.cuota;

}

}

const prestamo = new PrestamoClass();
//accediendo al DOM por ID
console.log(titulo.innerHTML); //queda como un unico elemento
titulo.innerHTML="Detalle del Prestamo";


//accediendo al DOM por Clase
const cards = document.getElementsByClassName('itemCard'); 
//recorro el array de cards
for (const card of cards) {
    console.log(card);
    //producto.innerHTML('Hola'); //esto queda como un array de 3 hola


}
//option button --------------------------------------

function validarButton(){
    let elementoActivo = document.querySelector('input[name="status"]:checked');
    if(elementoActivo) {
        return elementoActivo.value;
    } else {
        return 0;
    }
}

function setRadio(name, value) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(element => {
        if(element.value === value) {
            element.checked = true;
        }
    });
}

//---------------------------------------------


formulario.addEventListener("submit", validarFormulario);
const bienvenida = localStorage.getItem('bienvenida');
listado.innerHTML = bienvenida;
