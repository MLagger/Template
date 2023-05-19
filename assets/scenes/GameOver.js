export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {
  this.load.image("gameOver", "./assets/images/gameOver.jpg")
}
  create() {
   this.add.image(380,300,"gameOver").setScale(0.4)
  }

  update() {}
}
