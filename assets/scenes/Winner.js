export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {
    this.load.image("win", "./assets/images/win.png");
}
  create() {
   // this.add.text(300, 300, "YOU WIN", {
     // fontSize: "50px",
      //fill: "#fff",
    //});
    this.add.image(365,330, "win")
  }

  update() {}
}
