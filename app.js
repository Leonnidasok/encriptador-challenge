const TextArea = document.querySelector(".text-area");
const Mensaje = document.querySelector(".mensaje");
const Copiar = document.querySelector(".btn-copiar");
const Muñeco = document.querySelector(".muñeco");
const Alerta = document.querySelector(".alerta");
const Instrucciones = document.querySelector(".instrucciones");
const Restricciones = document.querySelector(".restricciones");
const BtnLimpiar = document.querySelector(".btn-limpiar");

// Función para verificar y mostrar el botón Limpiar y ocultar otros elementos
function actualizarBotonLimpiar() {
    if (TextArea.value.trim() !== "") {
        BtnLimpiar.style.display = "block";
        Muñeco.style.display = "none";
        Alerta.style.display = "none";
        Instrucciones.style.display = "none";
    } else {
        BtnLimpiar.style.display = "none";
        Muñeco.style.display = "block";
        Alerta.style.display = "block";
        Instrucciones.style.display = "block";
    }
}

function btnEncriptar() {
    if (TextArea.value.trim() === "") {
        Restricciones.textContent = "El campo no debe estar vacío";
        Restricciones.classList.add("restricciones--animacion");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(TextArea.value)) {
        Restricciones.textContent = "No se aceptan mayúsculas ni acentos, por favor inserte formato válido";
        Restricciones.classList.add("restricciones--animacion");
        TextArea.value = TextArea.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
        return;
    }

    const textoEncriptado = encriptar(TextArea.value);
    Mensaje.value = textoEncriptado;
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Restricciones.textContent = "Solo letras minúsculas y sin acentos";
    Restricciones.classList.remove("restricciones--animacion");
    actualizarBotonLimpiar();
}

function btnDesencriptar() {
    if (TextArea.value.trim() === "") {
        Restricciones.textContent = "El campo no debe estar vacío";
        Restricciones.classList.add("restricciones--animacion");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(TextArea.value)) {
        Restricciones.textContent = "No se aceptan mayúsculas ni acentos, por favor inserte formato válido";
        Restricciones.classList.add("restricciones--animacion");
        TextArea.value = TextArea.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
        return;
    }

    const textoDesencriptado = desencriptar(TextArea.value);
    Mensaje.value = textoDesencriptado;
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Restricciones.textContent = "Solo letras minúsculas y sin acentos";
    Restricciones.classList.remove("restricciones--animacion");
    actualizarBotonLimpiar();
}

function btnLimpiar() {
    TextArea.value = "";
    Mensaje.value = "";
    Copiar.style.display = "none";
    Restricciones.textContent = "Solo letras minúsculas y sin acentos";
    Restricciones.classList.remove("restricciones--animacion");
    BtnLimpiar.style.display = "none";
    actualizarBotonLimpiar();
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"], ["a", "ai"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada;
}

function btnCopiar() {
    navigator.clipboard.writeText(Mensaje.value).then(function() {
        console.log("Texto copiado");
    }).catch(function(error) {
        console.error("Error al copiar el texto: ", error);
    });
}

Copiar.addEventListener("click", btnCopiar);

// Verifica si el campo de texto tiene contenido al cargar la página
document.addEventListener("DOMContentLoaded", actualizarBotonLimpiar);
TextArea.addEventListener("input", actualizarBotonLimpiar);
