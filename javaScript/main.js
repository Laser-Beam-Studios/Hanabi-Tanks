var WINDOW = 
{
    WIDHT: 1280,
    HEIGHT: 720
};

const config = {
    type: Phaser.AUTO,
    width: WINDOW.WIDHT,
    height: WINDOW.HEIGHT,
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game-canvas",
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [MainMenu]
};

//Create the game instance
const game = new Phaser.Game(config);
game.scene.start("MainMenu");

function ScreenResize()
{
    console.log("Resize de " + WINDOW.WIDHT + " a " + game.scale.width + "; de " + WINDOW.HEIGHT + " a " + game.scale.height);
    WINDOW.WIDHT = game.scale.width;
    WINDOW.HEIGHT = game.scale.height;
}

window.addEventListener("resize", ScreenResize);