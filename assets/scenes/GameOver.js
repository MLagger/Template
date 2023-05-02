export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(300, 300, "YOU LOSE", {
      fontSize: "50px",
      fill: "#fff",
    });
  }

  update() {}
}
