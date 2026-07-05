const API_URL = "https://rickandmortyapi.com/api/character";
fetch (API_URL)
.then(function(respuesta) {
    if (!respuesta.ok) {
        throw new Error("Error en la solicitud");
        }

    return respuesta.json();
})
.then(function(characters) {
    console.log(characters);
})
.catch(function(error){
    console.log("Error: " + error);
})

