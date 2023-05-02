export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(300, 300, "YOU WIN", {
      fontSize: "50px",
      fill: "#fff",
    });
  }

  update() {}
}
