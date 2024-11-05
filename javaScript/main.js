const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-canvas",
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [IntroGame, GameScene, EndGame]
};

// Create the game instance
const game = new Phaser.Game(config);
game.scene.start("IntroScene");