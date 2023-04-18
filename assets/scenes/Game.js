export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    let shaperscolected = [
      { type: "Triangulo", count: 0 },
      { type: "Cuadrado", count: 0 },
      { type: "Rombo", count: 0 },
    ];
  }

  preload() {
    //cargar fondo, plataformas, formas, jugador
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("ninja", "./assets/images/Ninja.png");
    this.load.image("Platform", "./assets/images/platform.png");
    this.load.image("Triangulo", "./assets/images/Triangulo.png");
  }

  create() {
    //agregado sin fisica
    this.add.image(400, 300, "sky").setScale(0.555);
    //this.add.image(200, 550, "ninja");
    //this.add.image(400, 500, "Platform");

    //agregando fisicas
    this.ninja = this.physics.add.sprite(150, 500, "ninja");
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 570, "Platform").setScale(2).refreshBody();
    this.physics.add.collider(this.ninja, this.platformsGroup);

    this.shapeGroup = this.physics.add.group();
    this.shapeGroup.create(150, 0, "Triangulo");
    this.physics.add.collider(this.shapeGroup, this.platformsGroup);

    this.physics.add.overlap(this.ninja, this.shapeGroup, this.collectShape);
    null; //dejar fijo por ahora
    null; //dejar fijo por ahora
    // this.platform.create(500, 400, "Platform");
  }

  update() {}

  collectShape(ninja, figuraChocada) {
    console.log("Figura Recolectada");
    figuraChocada.disableBody(true, true);
  }
}
