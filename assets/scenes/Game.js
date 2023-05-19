import {
  PLAYER_MOUVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  CUADRADO,
  TRIANGULO,
  ROMBO,
  PUNTAJES,
  BOMBA,
  PLATFORM
} from "../../config.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.shapesRecolect = {
      [TRIANGULO]: { count: 0 },
      [CUADRADO]: { count: 0 },
      [ROMBO]: { count: 0 },
      [BOMBA]: { count: 0 }
    };

    this.shapeScore = {
      [TRIANGULO]: { score: 0 },
      [CUADRADO]: { score: 0 },
      [ROMBO]: { score: 0 },
      [BOMBA]: { score: 0 }
    };

    this.isWinner = false;
    this.isGameOver = false;
  }

  preload() {
    // Cargar fondo, plataformas, formas, jugador
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("ninja", "./assets/images/Ninja.png");
    this.load.image(PLATFORM, "./assets/images/platform.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
    this.load.image(BOMBA, "./assets/images/Bomba.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.ninja = this.physics.add.sprite(150, 500, "ninja");
    this.ninja.speed = 200;
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 570, "Platform").setScale(2).refreshBody();
    this.platformsGroup.create(700, 400, "Platform");
    this.platformsGroup.create(100, 200, "Platform");
    this.physics.add.collider(this.ninja, this.platformsGroup);

    this.shapeGroup = this.physics.add.group();

    this.physics.add.collider(this.ninja, this.platformsGroup);
 
    this.physics.add.collider(this.shapeGroup, this.platformsGroup, null, this.handleShapeCollision, this);
    this.shapeGroup = this.physics.add.group({
      bounceY: 1, // Habilitar el rebote vertical
      collideWorldBounds: false // Colisión con los límites del mundo
    });

    this.physics.add.collider(this.shapeGroup, this.platformsGroup);
    this.physics.add.overlap(this.ninja, this.shapeGroup, this.collectShape, null, this)
    this.physics.add.collider(this.shapeGroup, this.platformsGroup, this.handleShapeCollision, null, this);

    this.shapeGroup.children.iterate((shape) => {
      shape.body.setBounceY(1);
      shape.body.setCollideWorldBounds(true);
      shape.body.onWorldBounds = true; // Habilitar el evento onWorldBounds para los rebotes con el piso
      shape.body.world.on('worldbounds', () => {
        this.handleShapeCollision(shape, null);
    });
  });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(16, 16, "T: 0/ C: 0/ R:0 ", {
      fontSize: "20px",
      fill: "#ffffff"
    });

    this.scoreshape = this.add.text(16, 30, "Puntos Totales: ", {
      fontSize: "20px",
      fill: "#ffffff"
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
    figuraChocada.disableBody(true, true);

    const shapeName = figuraChocada.texture.key;
    this.shapesRecolect[shapeName].count++;
    this.shapeScore[shapeName].score += PUNTAJES[shapeName];

    this.scoreshape.setText(
      "Puntos Totales: " +
      (this.shapeScore[TRIANGULO].score +
        this.shapeScore[CUADRADO].score +
        this.shapeScore[ROMBO].score +
        this.shapeScore[BOMBA].score)
    );

    if (
      this.shapeScore[TRIANGULO].score +
      this.shapeScore[CUADRADO].score +
      this.shapeScore[BOMBA].score +
      this.shapeScore[ROMBO].score >=
      100
    ) {
      this.isWinner = true;
    }

    this.scoreText.setText(
      " T: " +
      this.shapesRecolect[TRIANGULO].count +
      " /C: " +
      this.shapesRecolect[CUADRADO].count +
      " /R: " +
      this.shapesRecolect[ROMBO].count
    );

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

    if (randomShape == BOMBA) {
      this.shapeGroup.create(randomX, 0, randomShape).setScale(0.10);
    } else {
      this.shapeGroup.create(randomX, 0, randomShape);
    }
  }

  handleShapeCollision(shape, platform) {
    const shapeName = shape.texture.key;

    // Verificar si la colisión se produce con una plataforma
    if (PLATFORM && PLATFORM.gameObject && platform.gameObject.texture.key === PLATFORM) {
      this.shapeScore[shapeName].score -= 1;

      if (this.shapeScore[shapeName].score <= 0) {
        shape.disableBody(true, true);
      }
    }
}



  }

