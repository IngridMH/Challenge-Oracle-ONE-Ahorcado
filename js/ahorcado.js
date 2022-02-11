function iniciarJuego(){
	function iniciarPantalla() {
		let altura = 800,
			base = 1200;

		if(window.innerHeight < 800){
			altura = window.innerHeight;
		}

		if(window.innerWidth < 1200){
			base = window.innerWidth;
		}
		return {base, altura};
	}

	function guiones() {
		var tam = (tamPalabra * 2) + 1;
		tam = Math.round(base / tam);

		var x = tam;
		var y = altura * 0.9;

		for (var i = 0; i < tamPalabra; i++) {
			pincel.beginPath();
			pincel.moveTo(x, y);
			pincel.lineTo(x+tam, y);
			pincel.closePath();
			pincel.stroke();
			x += tam*2;
		}
		return tam;
	}

	function tamLetra() {
		if (tamPalabra > 20) {
			return '20px serif';
		} else if (tamPalabra > 15) {
			return '30px serif';
		} else if (tamPalabra > 10) {
			return '50px serif';
		} else {
			return '50px serif';
		}
	}

	function finJuego(fin) {
		pincel.font = '50px serif';
		pincel.textAlign = 'right';

		if(fin) {
			pincel.fillStyle = "green";
			pincel.fillText("¡Ganaste, felicidades!",base,altura*0.25); 
		} else {
			pincel.fillStyle = "red";
			pincel.fillText("Fin del juego",base,altura*0.25);
			
			pincel.font = '20px serif';
			pincel.fillStyle = "black";
			pincel.fillText("La palabra era: "+palabra,base,altura*0.35);
		}

		document.getElementById('titulo').style.display = 'block';
		document.getElementById('jugar').style.display = 'block';
		document.getElementById('input').style.display = 'block';
		document.getElementById('agregar').style.display = 'block';
	} 

	function letraCorrecta(j) {
		pincel.font = tamLetra(tamPalabra);
		pincel.textAlign = 'center';
		pincel.fillText(pruebas[pruebas.length-1], (pos*j*2)+(pos*1.5), altura*0.89);
		correctas++;
	}

	function letraIncorrecta() {
		pincel.font = '30px serif';
		pincel.textAlign = 'right';
		pincel.fillText(pruebas[pruebas.length-1], x, altura*0.5);
		x -= 30;		
	}

	function dibujarHorca(num) {
		pincel.fillStyle = 'black';
		pincel.lineWidth = 2;

		switch(num){
			case 1: // Base de la horca 
			    pincel.beginPath();
			    pincel.moveTo(base*0.05, altura*0.75);
			    pincel.lineTo(base*0.15, altura*0.75);
			    pincel.lineTo(base*0.1, altura*0.7);
			    pincel.closePath();
			    pincel.stroke();
			    break;
		 
		    case 2: // Horca:
			    pincel.moveTo(base*0.1, altura*0.7);
			    pincel.lineTo(base*0.1, altura*0.05);
			    pincel.lineTo(base*0.3, altura*0.05);
			    pincel.lineTo(base*0.3, altura*0.1);
			    pincel.stroke();
			    break;

			case 3: //Cabeza:
			    pincel.beginPath();
			    pincel.arc(base*0.3,altura*0.15,altura*0.05,0,Math.PI*2);
			    pincel.stroke();
			    break;

			case 4: // Tronco:
			    pincel.moveTo(base*0.3, altura*0.2);
			    pincel.lineTo(base*0.3, altura*0.38);
			    pincel.stroke();
			    break;

			case 5: // Pierna izquierda:
			    pincel.moveTo(base*0.3, altura*0.38);
			    pincel.lineTo(base*0.25, altura*0.5);
			    pincel.stroke();
		    	break;

		    case 6: // Pierna derecha:
			    pincel.moveTo(base*0.3, altura*0.38);
			    pincel.lineTo(base*0.35, altura*0.5);
			    pincel.stroke();
		    	break;

		    case 7: // Brazo izquierdo:
	    		pincel.moveTo(base*0.3, altura*0.28);
			    pincel.lineTo(base*0.25, altura*0.25);
			    pincel.stroke();
			    break;

			case 8: // Brazo derecho:
			    pincel.moveTo(base*0.3, altura*0.28);
			    pincel.lineTo(base*0.35, altura*0.25);
			    pincel.stroke();
			    break;

			case 9: // Cara:
			    pincel.beginPath();
			    pincel.arc(base*0.3,altura*0.178,altura*0.01,0,Math.PI,true);
			    pincel.stroke();
			    pincel.beginPath();
			    pincel.arc(base*0.285,altura*0.145,altura*0.005,0,Math.PI*2,true);
			    pincel.moveTo(207,118);
			    pincel.arc(base*0.315,altura*0.145,altura*0.005,0,Math.PI*2,true);
			    pincel.fill();
			    break;

			default:
				break;
		}
	}

	//window.onload = function () { 
	document.onkeydown = teclaPresionada; //}

	function teclaPresionada(evObject) {
		if(correctas < tamPalabra && horca != 8) {
			if(evObject.which >= 65 && evObject.which <= 90 || evObject.which == 192) {
				if(evObject.which == 192) {
					var tecla = 'Ñ';
				}  else {
					var tecla = String.fromCharCode(evObject.which);
				}
				if (pruebas.includes(tecla) == false) {
					nuevoIntento(tecla);
				}
			}
		}
	} 

	function nuevoIntento(tecla) {
		pruebas.push(tecla);

		letra = pruebas.length - 1;
		var aux = 0;
		for (var i = 0; i < tamPalabra; i++) {
			if(palabra.charAt(i) == pruebas[letra]) { 
				letraCorrecta(i);
				aux++;
				if(correctas == tamPalabra) {
					finJuego(1);
				}
			}
		}
		if(aux == 0) {
			letraIncorrecta();
			horca++;
			dibujarHorca(horca);
			if(horca == 8) {
				finJuego(0);
				dibujarHorca(9);
			}
		}
	}

	let pantalla = document.querySelector("canvas");
	let pincel = pantalla.getContext("2d");
	pincel.fillStyle = "black";

	let {base, altura} = iniciarPantalla();
	pincel.clearRect(0, 0, base, altura);

	document.getElementById('titulo').style.display = 'none';
	document.getElementById('jugar').style.display = 'none';
	document.getElementById('input').style.display = 'none';
	document.getElementById('agregar').style.display = 'none';
	document.getElementById('imagen').style.display = 'none';
	document.getElementById('canvas').style.display = 'block';

	var numRand = Math.floor(Math.random()*palabras.length)
	var palabra = palabras[numRand].toUpperCase();
	var pruebas = [];

	var tamPalabra = palabra.length;
	var x = base, horca = 0, correctas = 0;
	var pos = guiones();
}
