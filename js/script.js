
const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	monto: /^\d{4,7}$/ // 4 a 7 numeros.
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
	switch (e.target.name) {
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
		document.getElementById(`${campo}`).classList.remove('form-control-incorrecto');
		document.getElementById(`${campo}`).classList.add('form-control-correcto');
		/*document.querySelector(`#${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#${campo} .form-control-error`).classList.remove('form-control-error-activo');
        */
		prestamo[campo] = true;
	} else {
		document.getElementById(`${campo}`).classList.add('form-control-incorrecto');
		document.getElementById(`${campo}`).classList.remove('form-control-correcto');
		/*document.querySelector(`#${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#${campo} .form-control-error`).classList.add('form-control-error-activo');
        */
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
		}, 8000);

		document.querySelectorAll('.form-control-correcto').forEach((icono) => {
			icono.classList.remove('form-control-correcto');
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
        case  meses==36:
            return Match.round( monto * 2.33 /36);
        break;
    
}
}


function cargarDatos(prestamo){
    let fecha;
    let cuota;
    let mes = {fecha,cuota};
    let mesesarray=[];
    let DateTime = luxon.DateTime;
    const dt = DateTime.now();
    console.log(dt.toISODate(DateTime.DATETIME_SHORT)); //=> '2022-07-07')

    prestamo.tipo = validarButton();
    if (isNaN(prestamo.nombre)&& (prestamo.monto>0) && (prestamo.plazo>0) && isNaN(prestamo.email) && isNaN(prestamo.tipo)){
        localStorage.setItem('bienvenida',`Bienvenid@ ${prestamo.nombre}!`);
        const bienvenida = localStorage.getItem('bienvenida');
        listado.textContent =  `${bienvenida} Elegiste Prestamo ${prestamo.tipo} por $${prestamo.monto}, ${prestamo.plazo} cuotas de  $${prestamo.cuota}. 
        Total a devolver. $${prestamo.total}`;

        const fechas = document.getElementById("fechas");
        let meses= {month: 1};
        
        let suma = dt.plus(meses); 
        console.log(suma.toISODate(DateTime.DATETIME_SHORT));
        
        for (let i = 1; i < prestamo.plazo; i++) {
            meses= {month: i};
            //console.log(`se vienen meses month:i-meses-`)
            //console.log(meses);
            //console.log(`se viene dt.plus(meses):-fecha-`)
            fecha=dt.plus(meses);
            //console.log(fecha);
            //console.log(`viene mes.fecha`)
            mes.fecha= fecha.toISODate(DateTime.DATETIME_SHORT);
            mes.cuota=prestamo.cuota;
            //console.log(mes.fecha);
            //console.log(`se viene mes`);
            //console.log(mes);
            mesesarray.push(mes);
            console.log (`Fecha: ${mesesarray[i]} `);
        } 
        fechas.textContent =  ` ${mesesarray}`;

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

		}, 8000);
    } 
    
    console.log(prestamo);

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
        element.value === value ? element.checked = true : element.checked = false;
        
    });
}


//---------------------------------------------


const prestamo = new PrestamoClass();
console.log(titulo.innerHTML); //queda como un unico elemento
titulo.innerHTML="Detalle del Prestamo";

const logout = document.querySelector('#logout');

logout.onclick = () => {
    localStorage.clear();
    localStorage.removeItem('bienvenida');
    listado.textContent = "";

}
console.log(prestamo);

//==============librerai Luxon ============




//console.log( dt.toLocaleString(DateTime.DATETIME_SHORT) );

//let DateTime = luxon.DateTime;
//const dt = DateTime.now();
//console.log (dt);
//console.log(dt.toISODate(DateTime.DATETIME_SHORT)); //=> '2022-07-07')
//let fecha = dt.toISODate(DateTime.DATETIME_SHORT);

//console.log(dt.localeString(DateTime));


// 25/1/2022 14:21
/*
const ejercicio = {hours: 1, minutes: 15};
const estudio = {hours: 2, minutes: 30};

console.log()

const suma = dt.plus(ejercicio).plus(estudio);

console.log(suma.toLocaleString(DateTime.DATETIME_SHORT));

console.log(suma.hour - dt.hour);
console.log(suma.minute - dt.minute);

if (dt.hour < 12) {
  console.log('Buenos dÃ­as');
} else if (dt.hour > 12 && dt.hour < 19) {
  console.log('Buenas tardes');
} else {
  console.log('Buenas noches');
}
*/