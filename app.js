const TextArea = document.querySelector(".text-area");
const Mensaje = document.querySelector(".mensaje");
const Copiar = document.querySelector(".btn-copiar");
const Muñeco = document.querySelector(".muñeco");
const Alerta = document.querySelector(".alerta");
const Instrucciones = document.querySelector(".instrucciones");
const Restricciones = document.querySelector(".restricciones")

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

function aplicarAnimacion() {
    Restricciones.classList.remove("animar"); // Elimina la clase para reiniciar la animación
    void Restricciones.offsetWidth; // Forza la reflujo del DOM
    Restricciones.classList.add("animar"); // Vuelve a agregar la clase para reiniciar la animación
}

function btnEncriptar() {
    const texto = TextArea.value.trim();
    
    if (texto === "") {
        Restricciones.textContent = "El campo no debe estar vacío";
        aplicarAnimacion(); // Aplica la animación
        return;
    }

    if (/[A-ZÁÉÍÓÚÑáéíóúñ]/.test(texto)) {
        Restricciones.textContent = "No se aceptan mayúsculas ni acentos, por favor inserte formato válido";
        aplicarAnimacion(); // Aplica la animación
        return;
    }

    const textoEncriptado = encriptar(texto);
    Mensaje.value = textoEncriptado;
    TextArea.value = "";
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Muñeco.style.display = "none";
    Alerta.style.display = "none";
    Instrucciones.style.display = "none";
    Restricciones.textContent = ""; // Limpia el mensaje de restricciones
    Restricciones.classList.remove("animar"); // Remueve la clase de animación si se limpia el mensaje
}

function encriptar(stringEncriptada){
    let matrizCodigo = [["e", "enter"], ["i","imes"], ["o","ober"], ["u", "ufat"], ["a", "ai"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada
}

function btnDesencriptar() {
    const texto = TextArea.value.trim();
    
    if (texto === "") {
        Restricciones.textContent = "El campo no debe estar vacío";
        aplicarAnimacion(); // Aplica la animación
        return;
    }

    if (/[A-ZÁÉÍÓÚÑáéíóúñ]/.test(texto)) {
        Restricciones.textContent = "No se aceptan mayúsculas ni acentos, por favor inserte formato válido";
        aplicarAnimacion(); // Aplica la animación
        return;
    }

    const textoDesencriptado = desencriptar(texto);
    Mensaje.value = textoDesencriptado;
    TextArea.value = "";
    Copiar.style.display = "block";
    Mensaje.style.display = "block";
    Muñeco.style.display = "none";
    Alerta.style.display = "none";
    Instrucciones.style.display = "none";
    Restricciones.textContent = ""; // Limpia el mensaje de restricciones
    Restricciones.classList.remove("animar"); // Remueve la clase de animación si se limpia el mensaje
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["a", "ai"], ["e", "enter"], ["i","imes"], ["o","ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada
}

function btnCopiar(){
    console.log(Mensaje.value);
    navigator.clipboard.writeText(Mensaje.value).then(function(){
        console.log("Texto copiado");
    }).catch(function(error){
        console.error("Error al copiar el texto: ", error);
    });
    } 
    
Copiar.addEventListener("click", btnCopiar);


