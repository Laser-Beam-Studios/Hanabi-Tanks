class Pause extends Phaser.Scene
{
    textsScale = 
    {
        "BackButton": 0.32,
        "OptionsButton": 0.32,
        "MainMenuButton": 0.32,
        
    }

    texts = {
        "BackButton":
        {
            pos: { x: 0.17, y: 0.94 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["BackButton"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "OptionsButton":
        {
            pos: { x: 0.5, y: 0.5 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["OptionsButton"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "MainMenuButton":
        {
            pos: { x: 0.5, y: 0.7 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["MainMenuButton"] / textDivider) + "px",                
                color: blackColor
            } 
        }
               
    }
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
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("PauseBackground", "../assets/UI/Screens/bgPauseTranparent.png");
        this.load.image("MainMenuButton", "../assets/UI/Buttons/mainMenu.png");
    }

    create() 
    {
        WebFont.load({
            custom: {
                families: ['FontChild'], 
                urls: ['../../css/styles.css']
            },
            active: () => 
            {
                console.log("Font Loaded");

                this.textsGroup = {};
                // Ejemplo de crear textos
                Object.keys(this.texts).forEach((key) =>
                {
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Pause", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Pause", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Pause", key);
                    });
                });

                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Pause");
                });
            }
          });
          
        AudioManager.Instance.SetActiveScene(this, false);


        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "PauseBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton");
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const options = this.add.image(this.texts["OptionsButton"].pos.x * WINDOW.WIDHT, this.texts["OptionsButton"].pos.y * WINDOW.HEIGHT, "OptionsButton");
        Scaler.ScaleToGameW(options, this.textsScale["OptionsButton"]);
        options.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, options));
        options.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        options.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        
        
        const mainMenu = this.add.image(this.texts["MainMenuButton"].pos.x * WINDOW.WIDHT, this.texts["MainMenuButton"].pos.y * WINDOW.HEIGHT, "MainMenuButton");
        Scaler.ScaleToGameW(mainMenu, this.textsScale["MainMenuButton"]);
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