export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }
  
    preload() {
      this.load.image("FondoMenu", "./assets/images/FondoMenu.jpg");
    }
  
    create() {
      this.add.image(400, 300, "FondoMenu").setScale(0.555);  
      this.add.text(400, 200, "NINJA MONCHO", { fontSize: "55px", fill: "#000000" }).setOrigin(0.5);
      this.add.text(400, 300, "PRECIONE CUALQUIER TECLA PARA COMENZAR", { fontSize: "30px", fill: "#000000" }).setOrigin(0.5);
  
      this.input.keyboard.once("keydown", this.startGame, this);
    }
  
    startGame() {
      this.scene.start("Game");
    }
  
    update() {
      // Código de actualización del menú (si es necesario)
    }
  }
  
  
  
  
  
  
  
  