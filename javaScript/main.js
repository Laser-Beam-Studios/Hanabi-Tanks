var WINDOW = 
{
    WIDHT: 1181,
    HEIGHT: 886
};

const config = {
    type: Phaser.Canvas,
    width: WINDOW.WIDHT,
    height: WINDOW.HEIGHT,
    aduio: {
        disableWebAudio: true
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "parent",
    canvas: document.getElementById("game-canvas"),
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },

    scene: [MainMenu, Credits, PowerUp, Level1, Pause, Options]

};

const audioManager = new AudioManager();

//Create the game instance
const game = new Phaser.Game(config);
game.scene.start("MainMenu");

function ScreenResize()
{
    WINDOW.WIDHT = game.scale.width;
    WINDOW.HEIGHT = game.scale.height;
}

window.addEventListener("resize", ScreenResize);