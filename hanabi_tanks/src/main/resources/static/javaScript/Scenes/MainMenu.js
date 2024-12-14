class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'MainMenu' });

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
    }

    preload() 
    {
        //this.load.image("MainMenuBackground", "../assets/UI/Screens/mainMenu.png")
        this.load.image("PlayButton", "../assets/UI/Buttons/play.png");
        this.load.image("OptionsButton", "../assets/UI/Buttons/options.png");
        this.load.image("CreditsButton", "../assets/UI/Buttons/credits.png");
        this.load.image("BackButton", "../assets/UI/Buttons/back.png"); // This is load here for used in the other menu scenes
        
        // SFX
        this.load.audio("ChangeMenu", "../assets/Audio/SFX/UI/ChangeMenu.mp3");
        this.load.audio("EnterButton", "../assets/Audio/SFX/UI/EnterOverButton.mp3");
        this.load.audio("ExitButton", "../assets/Audio/SFX/UI/ExitOverButton.mp3");
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);

        if (this.musicController == null)
        {
            this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
            this.musicController.Play();
        }
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));


        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "MainMenuBackground");
        Scaler.ScaleToGameH(Background);

        const play = this.add.image(WINDOW.WIDHT * 0.82, WINDOW.HEIGHT*0.75, "PlayButton");
        Scaler.ScaleToGameW(play, 0.32);
        play.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, play));
        play.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        play.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const credits = this.add.image(WINDOW.WIDHT * 0.82, WINDOW.HEIGHT * 0.95, "CreditsButton");
        Scaler.ScaleToGameW(credits, 0.32);
        credits.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, credits));
        credits.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        credits.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const options = this.add.image(WINDOW.WIDHT * 0.82, WINDOW.HEIGHT * 0.85, "OptionsButton");
        Scaler.ScaleToGameW(options, 0.32);
        options.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, options));
        options.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        options.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
    }

    OnPointerEnter()
    {
        console.log("Pointer Enter");
        AudioManager.Instance.PlayOneShoot("EnterButton", "SFX");
    }

    OnPointerExit()
    {
        console.log("Pointer Exit");
        AudioManager.Instance.PlayOneShoot("ExitButton", "SFX");
    }

    OnMusicPartEnds(last)
    {
        var lastIdx;
        for (var i = 0; i < this.songsParts.length; i++)
        {
            if(this.songsParts[i] == last) 
            {
                lastIdx = i;
                break;
            }
        }

        var randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        while(randomPartIdx == lastIdx)
        {
            randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        }
        
        this.musicController = AudioManager.Instance.CreateInstance(this.songsParts[randomPartIdx], "Music");
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, this.songsParts[randomPartIdx]));
        this.musicController.Play();
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
        
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
                this.scene.pause("MainMenu");
                this.scene.launch("Options", { scene: "MainMenu"});
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