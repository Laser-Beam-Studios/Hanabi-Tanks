class Pause extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Pause' });
        this.lastScene;
    }

    init(data)
    {
        this.lastScene = data.scene;
    }

    preload() 
    {
        this.load.image("PauseBackground", "../assets/UI/Screens/bgPauseTranparent.png");
        this.load.image("MainMenuButton", "../assets/UI/Buttons/mainMenu.png")
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);


        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "PauseBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton")
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const options = this.add.image((WINDOW.WIDHT) / 2, (WINDOW.HEIGHT) / 2, "OptionsButton");
        Scaler.ScaleToGameW(options, 0.32);
        options.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, options));
        options.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        options.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        
        
        const mainMenu = this.add.image((WINDOW.WIDHT) / 2, (WINDOW.HEIGHT * 2) / 3, "MainMenuButton");
        Scaler.ScaleToGameW(mainMenu, 0.32);
        mainMenu.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, mainMenu));
        mainMenu.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        mainMenu.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
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

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Pause");
                this.scene.resume(this.lastScene);
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key + " " + this.lastScene);
        
        switch(button.texture.key)
        {
            case "BackButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Pause");
                this.scene.resume(this.lastScene);
                break;
            case "OptionsButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.pause("Pause");
                this.scene.launch("Options", {scene: "Pause"});
                break;
            case "MainMenuButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Pause");
                this.scene.stop(this.lastScene);
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