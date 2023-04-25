import {
  PLAYER_MOUVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  CUADRADO,
  TRIANGULO,
  ROMBO,
} from "../../config.js";

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
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
  }

  create() {
    //agregado sin fisica
    this.add.image(400, 300, "sky").setScale(0.555);
    //this.add.image(200, 550, "ninja");
    //this.add.image(400, 500, "Platform");
    //this.add.image(300, 0, "Rombo");

    //agregando fisicas
    this.ninja = this.physics.add.sprite(150, 500, "ninja");
    this.ninja.speed = 200;
    this.platformsGroup = this.physics.add.staticGroup(); //asi se crea un grupo estatico
    this.platformsGroup.create(400, 570, "Platform").setScale(2).refreshBody();
    this.physics.add.collider(this.ninja, this.platformsGroup);

    this.shapeGroup = this.physics.add.group(); //asi se crea un grupo dinamico
    this.physics.add.collider(this.shapeGroup, this.platformsGroup);
    this.physics.add.overlap(this.ninja, this.shapeGroup, this.collectShape);
    null; //dejar fijo por ahora
    null; //dejar fijo por ahora
    // this.platform.create(500, 400, "Platform");
    //callback = llamada de regreso

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ninja.setVelocityX(-PLAYER_MOUVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.ninja.setVelocityX(PLAYER_MOUVEMENTS.x);
    } else {
      this.ninja.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ninja.body.touching.down) {
      this.ninja.setVelocityY(-PLAYER_MOUVEMENTS.y);
    }
  }

  collectShape(ninja, figuraChocada) {
    console.log("Figura Recolectada");
    figuraChocada.disableBody(true, true);
  }
  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    const randomX = Phaser.Math.RND.between(0, 800);

    this.shapeGroup.create(randomX, 0, randomShape);

    console.log("Shape is add");
  }
}
