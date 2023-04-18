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
  }

  create() {
    //agregado sin fisica
    this.add.image(400, 300, "sky").setScale(0.555);
    //this.add.image(200, 550, "ninja");
    //this.add.image(400, 500, "Platform");

    //agregando fisicas
    this.ninja = this.physics.add.sprite(400, 350, "ninja");
    this.platformasPropias = this.physics.add.staticGroup();
    this.platformasPropias
      .create(400, 570, "Platform")
      .setScale(2)
      .refreshBody();
    this.physics.add.collider(this.ninja, this.platformasPropias);
    // this.platform.create(500, 400, "Platform");
  }

  update() {}
}
