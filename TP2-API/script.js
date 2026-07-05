const API_URL = "https://rickandmortyapi.com/api/character";

var boton = document.getElementById("btnFetch");
var estado = document.getElementById("estado");
var personajes = document.getElementById("personajes");
var urlAnterior = null;
var urlSiguiente = null;
var btnAnterior = document.getElementById("btnAnterior");
var btnSiguiente = document.getElementById("btnSiguiente");


function cargarPersonajes(urlAConsultar) {
    
    if (!urlAConsultar) return;

    estado.textContent = "Cargando personajes...";

    fetch(urlAConsultar) 
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error en la solicitud o no se encontraron resultados");
        }
        return respuesta.json();
    })
    .then(function(characters) {
        estado.textContent = "";
        personajes.innerHTML = "";

        urlAnterior = characters.info.prev;
        urlSiguiente = characters.info.next;

        btnAnterior.disabled = !urlAnterior;
        btnSiguiente.disabled = !urlSiguiente;

        characters.results.forEach(function(character) {
            var li = document.createElement("li");
            
            li.innerHTML = `
                <img src="${character.image}" alt="${character.name}" style="width: 150px; border-radius: 25%;">
                <strong>${character.name}</strong> ${character.species} (${character.status})
            `;
            
            if (character.status === "Alive") {
                li.style.backgroundColor = "rgb(30, 173, 30)";
            } else if (character.status === "Dead") {
                li.style.backgroundColor = "rgba(196, 16, 16, 0.53)";
            }
            
            personajes.appendChild(li);
        });
    })
    .catch(function(error){
        estado.textContent = "Error: " + error.message;
        personajes.innerHTML = "";
        btnAnterior.disabled = true;
        btnSiguiente.disabled = true;
    });
}

boton.addEventListener("click", function() {
    cargarPersonajes(API_URL); 
});

var formulario = document.getElementById("formFiltros");

formulario.addEventListener("submit", function(evento) {

    console.log("¡Se hizo clic en Aplicar Filtros!");
    
    evento.preventDefault(); 

    var inputNombre = document.getElementById("inputNombre").value;
    var selectEstado = document.getElementById("selectEstado").value;
    var inputEspecie = document.getElementById("inputEspecie").value;
    var inputTipo = document.getElementById("inputTipo").value;
    var selectGenero = document.getElementById("selectGenero").value;

    var urlFiltrada = API_URL + "/?";

    if (inputNombre !== "") {
        urlFiltrada += "name=" + inputNombre + "&";
    }
    if (selectEstado !== "") {
        urlFiltrada += "status=" + selectEstado + "&";
    }
    if (inputEspecie !== "") {
        urlFiltrada += "species=" + inputEspecie + "&";
    }
    if (inputTipo !== "") {
        urlFiltrada += "type=" + inputTipo + "&";
    }
    if (selectGenero !== "") {
        urlFiltrada += "gender=" + selectGenero + "&";
    }

    cargarPersonajes(urlFiltrada);
});

btnAnterior.addEventListener("click", function() {
    cargarPersonajes(urlAnterior);
});

btnSiguiente.addEventListener("click", function() {
    cargarPersonajes(urlSiguiente);
});