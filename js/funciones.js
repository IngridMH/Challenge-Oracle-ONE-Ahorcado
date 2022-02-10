function agregarPalabra() {
	var nuevo = (input.value).toUpperCase();
	if(palabras.includes(nuevo) == false) {
		palabras.push(nuevo);
	} else {
		alert("La palabra ingresada ya se encuentra en las opciones.");
	}
	input.value = "";
		input.focus();
}
var input = document.querySelector("input");
var boton1 = document.getElementById("agregar");
var boton2 = document.getElementById("jugar");

boton1.onclick = agregarPalabra;
boton2.onclick = iniciarJuego;