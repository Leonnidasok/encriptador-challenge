// Selección de elementos del DOM
const TextArea = document.querySelector(".text-area");
const Mensaje = document.querySelector(".mensaje");
const Copiar = document.querySelector(".btn-copiar");
const Muñeco = document.querySelector(".muñeco");
const Alerta = document.querySelector(".alerta");
const Instrucciones = document.querySelector(".instrucciones");
const Limpiar = document.querySelector(".btn-limpiar");

// Función para actualizar la visibilidad de los elementos
function actualizarVisibilidad() {
    const textoNoVacio = TextArea.value.trim() !== "";

    // Muñeco.style.display = textoNoVacio ? "none" : "block";
    Alerta.style.display = textoNoVacio ? "none" : "block";
    Instrucciones.style.display = textoNoVacio ? "none" : "block";
    Limpiar.style.display = textoNoVacio ? "block" : "none";
}

// Función para mostrar alertas con animación
function mostrarAlerta(mensaje) {
    Instrucciones.textContent = mensaje;
    Instrucciones.classList.add("animar");
    setTimeout(() => Instrucciones.classList.remove("animar"), 1000);
}

// Función para reiniciar el mensaje desencriptado
function reiniciarMensaje() {
    Mensaje.value = "";
    // Muñeco.style.display = "none";
    
    // Mostrar alerta e instrucciones cuando se escriba algo nuevo
    Alerta.style.display = "block";
    Instrucciones.style.display = "block";
    Limpiar.style.display = "block";    
    // actualizarVisibilidad();
}

// Función para encriptar texto
function encriptar(stringEncriptada) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"], ["a", "ai"]];
    return matrizCodigo.reduce((acumulado, [letra, codigo]) => {
        return acumulado.replaceAll(letra, codigo);
    }, stringEncriptada.toLowerCase());
}

// Función para desencriptar texto
function desencriptar(stringDesencriptada) {
    const matrizCodigo = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];
    return matrizCodigo.reduce((acumulado, [letra, codigo]) => {
        return acumulado.replaceAll(codigo, letra);
    }, stringDesencriptada.toLowerCase());
}

// Función para manejar el evento de encriptar
function btnEncriptar() {
    const texto = TextArea.value.trim();

    if (texto === "") {
        mostrarAlerta("El campo no debe estar vacío");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(texto)) {
        mostrarAlerta("No se aceptan mayúsculas ni acentos, por favor inserte formato válido");
        return;
    }

    Mensaje.value = encriptar(texto);
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Instrucciones.textContent = "Solo letras minúsculas y sin acentos";
    actualizarVisibilidad();
}

// Función para manejar el evento de desencriptar
function btnDesencriptar() {
    const texto = TextArea.value.trim();

    if (texto === "") {
        mostrarAlerta("El campo no debe estar vacío");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(texto)) {
        mostrarAlerta("No se aceptan mayúsculas ni acentos, por favor inserte formato válido");
        return;
    }

    Mensaje.value = desencriptar(texto);
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Instrucciones.textContent = "Solo letras minúsculas y sin acentos";
    actualizarVisibilidad();
}

// Función para copiar el texto al portapapeles
function btnCopiar() {
    navigator.clipboard.writeText(Mensaje.value)
        .then(() => console.log("Texto copiado"))
        .catch(error => console.error("Error al copiar el texto:", error));
}

// Función para recargar la página actual
function btnLimpiar() {
    location.reload();
}

// Event listeners
Copiar.addEventListener("click", btnCopiar);
Limpiar.addEventListener("click", btnLimpiar);
TextArea.addEventListener("input", reiniciarMensaje);