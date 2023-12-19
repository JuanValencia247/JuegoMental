// Inilizacion de variables
let tarjetasDestapadas = 0;
let temporizador = false;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let pares = 0;
let tiempo = 30;
let tiempoInicial = 30;
let aciertos = 0;
let movimientos = 0;
let tiempoRegresivoId = null;

//Audios
let windAudio = new Audio("./sounds/win.wav");
let losedAudio = new Audio("./sounds/lose.wav");
let clickdAudio = new Audio("./sounds/click.wav");
let righdAudio = new Audio("./sounds/righ.wav");
let wrongdAudio = new Audio("./sounds/wrong.wav");

//Apuntando a documento HTML
let mostrarMovimiento = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

//Generacion de numeros alertorios
const number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
number.sort(() => Math.random() - 0.5);
console.log(number);

//Funciones
const contarTiempo = () => {
  tiempoRegresivoId = setInterval(
    () => {
      mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
      tiempo--;
      if (tiempo < 0) {
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas(number);
        losedAudio.play();
      }
    },
    1000,
    tiempo
  );
};

const bloquearTarjetas = () => {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./images/${number[i]}.png" alt="">`;
    clickdAudio.play();
    tarjetaBloqueada.disabled = true;
  }
};

const destapar = (id) => {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }


  if (tarjetasDestapadas == 0) {
    // Mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = number[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
    clickdAudio.play();

    //Deshabilitar primer boton
    tarjeta1.disabled = true;
    tarjetasDestapadas++;

  } else if (tarjetasDestapadas == 1) {
    // Mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = number[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

    //Deshabilitar primer boton
    tarjeta2.disabled = true;
    tarjetasDestapadas++;

    //Incrementar movimientos
    movimientos++;
    mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      //Encerar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      righdAudio.play();
      if (aciertos == 8) {
        windAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        mostrarTiempo.innerHTML = `Exelente te demoraste ${tiempoInicial - tiempo} segundos`;
        mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`;
      }
    } else {
      //Mostrar momentaneamente valores y volver a tapar
      wrongdAudio.play();
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }

};
