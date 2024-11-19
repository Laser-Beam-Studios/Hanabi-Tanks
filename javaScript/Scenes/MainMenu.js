class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'MainMenu' });

        this.music;
    }

    preload() 
    {
        this.load.image("MainMenuBackground", "../assets/UI/Screens/mainMenu.png")
        this.load.image("PlayButton", "../assets/UI/Buttons/play.png");
        this.load.image("OptionsButton", "../assets/UI/Buttons/options.png");
        this.load.image("CreditsButton", "../assets/UI/Buttons/credits.png");
        this.load.image("BackButton", "../assets/UI/Buttons/mainMenu.png"); // This is load here for used in the other menu scenes

        this.load.audio("Song1", "../assets/Audio/Music/Prueba_ArpegiosLargosMoonlitNight_EnGmenor.mp3");
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);

        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "MainMenuBackground");
        Scaler.ScaleToGameH(Background);

        const play = this.add.image((WINDOW.WIDHT * 3) / 4, WINDOW.HEIGHT/2, "PlayButton");
        Scaler.ScaleToGameW(play, 0.32);
        play.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, play));

        const credits = this.add.image((WINDOW.WIDHT * 3) / 4, (WINDOW.HEIGHT * 3) / 4, "CreditsButton");
        Scaler.ScaleToGameW(credits, 0.32);
        credits.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, credits));

        const options = this.add.image((WINDOW.WIDHT * 3) / 4, (WINDOW.HEIGHT * 2.5) / 4, "OptionsButton");
        Scaler.ScaleToGameW(options, 0.32);
        options.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, options));

        
        if (this.music == null) this.music = AudioManager.Instance.PlayLoop("Song1", "Music");
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        
        switch(button.texture.key)
        {
            case "PlayButton":
                this.scene.stop("MainMenu");
                this.scene.start("Level1");
                break;
            case "CreditsButton":
                this.scene.stop("MainMenu");
                this.scene.start("Credits");
                break;
            case "OptionsButton":
                this.scene.stop("MainMenu");
                this.scene.start("Options");
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