var WINDOW = 
{
    WIDHT: 1181,
    HEIGHT: 886
};

const config = {
    type: Phaser.Canvas,
    width: WINDOW.WIDHT,
    height: WINDOW.HEIGHT,
    dom: {
        createContainer: true
    },
    aduio: {
        disableWebAudio: true
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: document.getElementById("Context"),
    canvas: document.getElementById("game-canvas"),
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
  
    scene: [Login, MainMenu, Credits, Victory, PowerUp, Level1, Level2, Level3, Level4, Level5, Level6, Pause, Options, SecretLevel]

};

const audioManager = new AudioManager();

//Create the game instance
const game = new Phaser.Game(config);
game.scene.start("Login");

function ScreenResize()
{
    WINDOW.WIDHT = game.scale.width;
    WINDOW.HEIGHT = game.scale.height;
}

window.addEventListener("resize", ScreenResize);