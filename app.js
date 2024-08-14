const TextArea = document.querySelector(".text-area");
const Mensaje = document.querySelector(".mensaje");
const Copiar = document.querySelector(".btn-copiar");
const Muñeco = document.querySelector(".muñeco");
const Alerta = document.querySelector(".alerta");
const Instrucciones = document.querySelector(".instrucciones");
const Restricciones = document.querySelector(".restricciones");

function actualizarVisibilidad() {
    if (TextArea.value.trim() !== "") {
        Muñeco.style.display = "none";
        Alerta.style.display = "none";
        Instrucciones.style.display = "none";
    } else {
        Muñeco.style.display = "block";
        Alerta.style.display = "block";
        Instrucciones.style.display = "block";
    }
}

function mostrarAlerta(mensaje) {
    Instrucciones.textContent = mensaje;
    Instrucciones.classList.add("animar");

    // Remover la clase después de 1 segundo para que la animación se pueda repetir
    setTimeout(() => {
        Instrucciones.classList.remove("animar");
    }, 1000);
}

function btnEncriptar() {
    if (TextArea.value.trim() === "") {
        mostrarAlerta("El campo no debe estar vacío");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(TextArea.value)) {
        mostrarAlerta("No se aceptan mayúsculas ni acentos, por favor inserte formato válido");
        return;
    }

    const textoEncriptado = encriptar(TextArea.value);
    Mensaje.value = textoEncriptado;
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Instrucciones.textContent = "Solo letras minúsculas y sin acentos";

    actualizarVisibilidad();
}

function btnDesencriptar() {
    if (TextArea.value.trim() === "") {
        mostrarAlerta("El campo no debe estar vacío");
        return;
    }

    if (/[A-ZÁÉÍÓÚÜÑ]/.test(TextArea.value)) {
        mostrarAlerta("No se aceptan mayúsculas ni acentos, por favor inserte formato válido");
        return;
    }

    const textoDesencriptado = desencriptar(TextArea.value);
    Mensaje.value = textoDesencriptado;
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Instrucciones.textContent = "Solo letras minúsculas y sin acentos";

    actualizarVisibilidad();
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"], ["a", "ai"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
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

