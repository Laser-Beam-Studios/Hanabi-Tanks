class Victory extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Victory' });

        this.music;
    }

    init(data)
    {
        this.player1 = data.player1;
        this.player2 = data.player2;
    }

    preload() 
    {
        this.load.image("VictoryBackground", "../assets/UI/Screens/win.png");
        this.load.spritesheet("PowerUps", "../assets/PowerUpSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("Numbers", "../assets/numbersSpritesheet.png", { frameWidth: 64, frameHeight: 64 });
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);

        const victory = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "VictoryBackground");
        Scaler.ScaleToGameH(victory);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton");
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back))
        
        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
        
        let index = 0;
        let powerUps = [];
        if (this.player1.score > this.player2.score)
        {
            index = 1;
            powerUps = this.player1.powerUps;
        }
        else
        {
            index = 2;
            powerUps = this.player2.powerUps;
        }

        let winPlayer = this.add.sprite(WINDOW.WIDHT * 0.77617, WINDOW.HEIGHT * 0.36507, "Numbers", index);
        Scaler.ScaleToGameH(winPlayer, 0.09634);
        let player1Score = this.add.sprite(WINDOW.WIDHT * 0.70561, WINDOW.HEIGHT * 0.63981, "Numbers", this.player1.score);
        Scaler.ScaleToGameH(player1Score, 0.07226);
        let divider = this.add.sprite(WINDOW.WIDHT * 0.77617, WINDOW.HEIGHT * 0.63981, "Numbers", 4);
        Scaler.ScaleToGameH(divider, 0.07226);
        let player2Score = this.add.sprite(WINDOW.WIDHT * 0.84674, WINDOW.HEIGHT * 0.63981, "Numbers", this.player2.score);
        Scaler.ScaleToGameH(player2Score, 0.07226);

        // power ups

        let powerUp1 = this.add.sprite(WINDOW.WIDHT * 0.23144, WINDOW.HEIGHT * 0.26345, "PowerUps", powerUps[0]);
        Scaler.ScaleToGameH(powerUp1, 0.12043);
        let powerUp2 = this.add.sprite(WINDOW.WIDHT * 0.48546, WINDOW.HEIGHT * 0.26345, "PowerUps", powerUps[1]);
        Scaler.ScaleToGameH(powerUp2, 0.12043);
        if (powerUps.lenght == 2)
            return;
        let powerUp3 = this.add.sprite(WINDOW.WIDHT * 0.23144, WINDOW.HEIGHT * 0.54949, "PowerUps", powerUps[2]);
        Scaler.ScaleToGameH(powerUp3, 0.12043);
        if (powerUps.lenght == 3)
            return;
        let powerUp4 = this.add.sprite(WINDOW.WIDHT * 0.48546, WINDOW.HEIGHT * 0.54949, "PowerUps", powerUps[3]);
        Scaler.ScaleToGameH(powerUp4, 0.12043);
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Victory");
                this.scene.start("MainMenu");
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        
        switch(button.texture.key)
        {
            case "BackButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Victory");
                this.scene.start("MainMenu");
                break;
            default:
                console.log("ERROR_IN_CLICK_BUTTON: UNKNOWN_BUTTON_KEY: " + button.texture.key);
                break;
        }
    }

    update() 
    {

    }
}