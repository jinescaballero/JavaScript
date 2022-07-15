// URLS
const URL_DOLAR = "./dolar.json";


// DOM
const valores = document.querySelector("#valores");


// FUNCIONES
const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}


// ASYNC - AWAIT - TRY - CATCH

const obtenerDolarAsync = async () => {
    try {
    valores.innerHTML = '...Cargando';
    const respuesta = await fetch(URL_DOLAR); 
    const dolarResults = await respuesta.json();
    valores.innerHTML = '';
    console.log(dolarResults);
    const { results } = dolarResults;
    for (const dolar of results) {
    const { url, name, venta, compra} = dolar;
    const id = url.substr(-1);
    const element = document.createElement('div');
    element.className = 'card';
    element.innerHTML = `
    <img src="./image/dolar${id}.jpg">
    <h2 class="dolar-name"> ${capitalize(name)}</h2>
    <h2 class="dolar-name">Compra $${compra} - Venta:$${venta}</h2>`;
    
    valores.append(element);
}
} catch {

} finally {
    
}
}

fetch(URL_DOLAR);
obtenerDolarAsync();
