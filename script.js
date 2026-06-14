const form = document.getElementById('form-suscripcion');
const tituloSaludo = document.getElementById('titulo-saludo');

const campos = {
    nombre: document.getElementById('nombre'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    'repetir-password': document.getElementById('repetir-password'),
    edad: document.getElementById('edad'),
    telefono: document.getElementById('telefono'),
    direccion: document.getElementById('direccion'),
    ciudad: document.getElementById('ciudad'),
    cp: document.getElementById('cp'),
    dni: document.getElementById('dni')
};

const validaciones = {
    nombre: (val) => val.length > 6 && val.trim().includes(' '),
    
    email: (val) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(val);
    },
    
    password: (val) => {
        const tieneLetras = /[a-zA-Z]/.test(val);
        const tieneNumeros = /[0-9]/.test(val);
        return val.length >= 8 && tieneLetras && tieneNumeros;
    },
    
    'repetir-password': (val) => val === campos.password.value && val.length > 0,
    
    edad: (val) => {
        const num = parseInt(val, 10);
        return !isNaN(num) && Number.isInteger(num) && num >= 18;
    },
    
    telefono: (val) => {
        const regexTel = /^[0-9]+$/;
        return val.length >= 7 && regexTel.test(val);
    },
    
    direccion: (val) => {
        const tieneLetras = /[a-zA-Z]/.test(val);
        const tieneNumeros = /[0-9]/.test(val);
        return val.length >= 5 && tieneLetras && tieneNumeros && val.trim().includes(' ');
    },
    
    ciudad: (val) => val.trim().length >= 3,
    
    cp: (val) => val.trim().length >= 3,
    
    dni: (val) => {
        const regexDni = /^[0-9]+$/;
        return (val.length === 7 || val.length === 8) && regexDni.test(val);
    }
};

const mensajesError = {
    nombre: 'Debe tener más de 6 letras y al menos un espacio.',
    email: 'Debe ingresar un formato de email válido.',
    password: 'Mínimo 8 caracteres, formados por letras y números.',
    'repetir-password': 'Las contraseñas no coinciden.',
    edad: 'Debe ser un número entero mayor o igual a 18.',
    telefono: 'Mínimo 7 dígitos, sin espacios, guiones ni paréntesis.',
    direccion: 'Mínimo 5 caracteres, con letras, números y espacio en el medio.',
    ciudad: 'Debe tener al menos 3 caracteres.',
    cp: 'Debe tener al menos 3 caracteres.',
    dni: 'Debe ser un número de 7 u 8 dígitos.'
};

function validarCampo(idCampo) {
    const input = campos[idCampo];
    const valor = input.value;
    const esValido = validaciones[idCampo](valor);
    const contenedorError = document.getElementById(`error-${idCampo}`);

    if (!esValido) {
        contenedorError.textContent = mensajesError[idCampo];
        input.style.border = "2px solid #cc0000";
        return false;
    } else {
        contenedorError.textContent = "";
        input.style.border = "2px solid #00aa00";
        return true;
    }
}

function limpiarError(idCampo) {
    const input = campos[idCampo];
    const contenedorError = document.getElementById(`error-${idCampo}`);
    contenedorError.textContent = "";
    input.style.border = "1px solid #ccc";
}


Object.keys(campos).forEach(idCampo => {
    campos[idCampo].addEventListener('blur', () => {
        validarCampo(idCampo);
    });

    campos[idCampo].addEventListener('focus', () => {
        limpiarError(idCampo);
    });
});


form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let formValido = true;
    let errores = [];
    let datosExitosos = "Suscripción Exitosa!\n\nDatos cargados:\n";

    Object.keys(campos).forEach(idCampo => {
        const pasoValidacion = validarCampo(idCampo);
        if (!pasoValidacion) {
            formValido = false;
            errores.push(`${idCampo.toUpperCase()}: ${mensajesError[idCampo]}`);
        } else {
            datosExitosos += `- ${idCampo.toUpperCase()}: ${campos[idCampo].value}\n`;
        }
    });

    if (formValido) {
        alert(datosExitosos);
    } else {
        alert("El formulario contiene errores que deben ser corregidos:\n\n" + errores.join("\n"));
    }
});

campos.nombre.addEventListener('input', () => {
    const valorNombre = campos.nombre.value.toUpperCase();
    if (valorNombre.trim() === "") {
        tituloSaludo.textContent = "HOLA";
    } else {
        tituloSaludo.textContent = `HOLA ${valorNombre}`;
    }
});