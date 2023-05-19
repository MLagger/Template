const PLAYER_MOUVEMENTS = {
  x: 160,
  y: 300,
};

const SHAPE_DELAY = 3000;

const TRIANGULO = "Triangulo" ;
const ROMBO = "Rombo" ;
const CUADRADO = "Cuadrado";
const BOMBA = "Bomba";

const PUNTAJES = {
  [ROMBO]: 15,
  [CUADRADO]: 10,
  [TRIANGULO]: 20,
  [BOMBA]: -25
};

const PLATFORM = "Platform"


const SHAPES = [TRIANGULO, CUADRADO, ROMBO, BOMBA];

export { PLAYER_MOUVEMENTS, SHAPE_DELAY, SHAPES, CUADRADO, TRIANGULO, ROMBO, PUNTAJES, BOMBA, PLATFORM };
