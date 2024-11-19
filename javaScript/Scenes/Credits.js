class Credits extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Credits' });
    }

    preload() 
    {
        this.load.image("CreditsBackground", "../assets/UI/Screens/credits.png");
    }

    create() 
    {
        const credits = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "CreditsBackground");
        Scaler.ScaleToGameH(credits);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton");
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back))
        
        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                this.scene.stop("Credits");
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
                this.scene.stop("Credits");
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