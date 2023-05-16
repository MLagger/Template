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
  [ROMBO]: 30,
  [CUADRADO]: 40,
  [TRIANGULO]: 50,
  [BOMBA]: -20
};




const SHAPES = [TRIANGULO, CUADRADO, ROMBO, BOMBA];

export { PLAYER_MOUVEMENTS, SHAPE_DELAY, SHAPES, CUADRADO, TRIANGULO, ROMBO, PUNTAJES, BOMBA };
