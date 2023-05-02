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
    this.shapesRecolect = {
      ["Triangulo"]: { count: 0, score: 10 },
      ["Cuadrado"]: { count: 0, score: 20 },
      ["Rombo"]: { count: 0, score: 50 },
    };

    this.isWinner = false;
    this.isGameOver = false;
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
    this.physics.add.overlap(
      this.ninja,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );
    // this.platform.create(500, 400, "Platform");
    //callback = llamada de regreso

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
    //agregar texto
    this.scoreText = this.add.text(16, 16, "T: 0/ C: 0/ R:0 ", {
      fontSize: "20px",
      fill: "#ffffff",
    });
  }

  update() {
    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("GameOver");
    }

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

    const shapeName = figuraChocada.texture.key;
    this.shapesRecolect[shapeName].count++;

    this.scoreText.setText(
      " T: " +
        this.shapesRecolect[TRIANGULO].count +
        " /C: " +
        this.shapesRecolect[CUADRADO].count +
        " /R: " +
        this.shapesRecolect[ROMBO].count
    );

    console.log(shapeName);

    if (
      this.shapesRecolect[TRIANGULO].count >= 2 &&
      this.shapesRecolect[CUADRADO].count >= 2 &&
      this.shapesRecolect[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }
  }
  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    const randomX = Phaser.Math.RND.between(0, 800);

    this.shapeGroup.create(randomX, 0, randomShape);

    console.log("Shape is add");
  }
}
