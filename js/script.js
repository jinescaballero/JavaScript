
// Declaraciones
const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll('#formulario input');
let detalle =document.getElementById("#detalle");
const logout = document.querySelector('#logout');
let mesesarray=[];

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	monto: /^\d{4,7}$/ ,// 4 a 7 numeros.
    plazo:/^\d{1,2}$/
}


const validarFormulario = (e) => {
    prestamo.nombre = document.querySelector("#nombre").value;
    prestamo.monto = document.querySelector("#monto").value;
    prestamo.plazo = document.querySelector("#plazo").value;
    prestamo.email = document.querySelector("#email").value;
    prestamo.cuota = calcularCuota(prestamo.plazo, prestamo.monto);
    prestamo.total= prestamo.cuota * prestamo.plazo;
    const listado = document.getElementById("listado");
    cargarDatos(prestamo);
	switch (e.target.id) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "monto":
			validarCampo(expresiones.monto, e.target, 'monto');
		break;
        case "plazo":
			validarCampo(expresiones.plazo, e.target, 'plazo');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        prestamo[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        prestamo[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);
    });


formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	if( prestamo.nombre && prestamo.email && prestamo.monto &&  prestamo.plazo && prestamo.tipo){
		formulario.reset();
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

function calcularCuota(meses,monto) {
    switch (true){
        case meses==3: 
            return Math.round( monto * 1.15 /3);
        break;
        case meses==6: 
            return Math.round( monto * 1.21 /6);
        break;      
        case meses==12: 
            return  Math.round( monto * 1.46 /12);
        break;
        case  meses==24:
            return Math.round( monto * 1.84/24);
        break;
    
}
}


function cargarDatos(prestamo){
    
    prestamo.tipo = validarButton();
    if (isNaN(prestamo.nombre)&& (prestamo.monto>0) && (prestamo.plazo>0) && isNaN(prestamo.email) && isNaN(prestamo.tipo)){
        localStorage.setItem('bienvenida',`Bienvenid@ ${prestamo.nombre}!`);
        const bienvenida = localStorage.getItem('bienvenida');
        informarFechas();
        listado.innerHTML=`${bienvenida} Cronograma del Prestamo`;
        btn.onclick = () => {
            generarTabla();   
        }
    } 
    

}

function generarTabla(){
    let numFilas= prestamo.plazo; 
    let contenedorTabla = document.getElementById("contenedorTabla");
    contenedorTabla.innerHTML="";
    let tabla = "<table>";
    tabla += "<td><h3>Monto</h3></td>";
    tabla += "<td><h3>Plazo</h3></td>";
    tabla += "<td><h3>Cuota</h3></td>";
    tabla += "<td><h3> Tipo </h3></td>";
    tabla += "<td><h3> Monto a Devolver</h3></td>";
    tabla += "<tr>";
    tabla += `<td><h3>$${prestamo.monto}</h3></td>`;
    tabla += `<td><h3>${prestamo.plazo}</h3></td>`;
    tabla += `<td><h3>$${prestamo.cuota}</h3></td>`;
    tabla += `<td><h3>${prestamo.tipo} </h3></td>`;
    tabla += `<td><h3>$${prestamo.total} </h3></td>`;
    tabla += "</tr>"; 
    tabla += "<tr>";
    
    for (let f=0; f <numFilas; f++){
        tabla += `<td><h3>Cuota ${f+1}:</h3></td>`;
        tabla += `<td><h3>${mesesarray[f]}</h3></td>`; 
        tabla += "</tr>";
    }
    tabla +="</table>";
    contenedorTabla.innerHTML=tabla;
}


//==============Funcion con libreria Luxon ============

function informarFechas(){
    let DateTime = luxon.DateTime;
    let fecha_parseada;
    const dt = DateTime.now();
    for (let i = 1; i <= prestamo.plazo; i++) {
        meses= {month: i};
        let suma = dt.plus(meses); 
        fecha_parseada= suma.toISODate(DateTime.DATETIME_SHORT);
        mesesarray.push(fecha_parseada);
    } 
    
}


class PrestamoClass {
    constructor(nombre, monto,plazo,email,tipo){
    this.nombre = nombre;
    this.monto = monto;
    this.plazo=plazo;
    this.email=email;
    this.cuota=0;
    this.tipo='';
    this.total=this.plazo*this.cuota;

}

}
//----------option button ------------------------------
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
        element.value === value ? element.checked = true : element.checked = false;
        
    });
}

//-----------------fin option button----------------------------
const prestamo = new PrestamoClass();
logout.onclick = () => {
    localStorage.clear();
    localStorage.removeItem('bienvenida');
    listado.textContent = "";

}



