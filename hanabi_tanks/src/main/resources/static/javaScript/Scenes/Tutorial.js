class Tutorial extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Tutorial' });
        this.lastScene;
    }

    init(data)
    {
        this.lastScene = data.scene;
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("PauseBackground", "../assets/UI/Screens/bgPauseTranparent.png");
        this.load.image("MainMenuButton", "../assets/UI/Buttons/mainMenu.png")
    }

    create() 
    {
        WebFont.load({
            custom: {
              families: ['FontChild'], 
              urls: ['../../css/styles.css']
            },
            active: () => {
              console.log("Font Loaded");
            }
          });
          
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "PauseBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton")
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
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
                this.scene.stop("Tutorial");
                this.scene.start("MainMenu");
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
                this.scene.stop("Tutorial");
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