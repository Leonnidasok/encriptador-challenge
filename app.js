const TextArea = document.querySelector(".text-area");
const Mensaje = document.querySelector(".mensaje");
const Respuesta = document.querySelector(".respuesta");
const Muñeco = document.querySelector(".muñeco");
const Alerta = document.querySelector(".alerta");
const Instrucciones = document.querySelector(".instrucciones");

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

function btnEncriptar(){
    const textoEncriptado = encriptar(TextArea.value);
    Mensaje.value = textoEncriptado;
    TextArea.value = "";
    Respuesta.style.display = "block";
    Mensaje.style.display = "block";
    Muñeco.style.display = "none";
    Alerta.style.display = "none";
    Instrucciones.style.display = "none";
}

function encriptar(stringEncriptada){
    let matrizCodigo = [["a", "ai"], ["e", "enter"], ["i","imes"], ["o","ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada
}

function btnDesencriptar(){
    const textoEncriptado = desencriptar(TextArea.value);
    Mensaje.value = textoEncriptado;
    TextArea.value = "";
    //Ver como sacar imagen 
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