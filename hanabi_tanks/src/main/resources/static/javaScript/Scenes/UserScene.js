class UserScene extends Phaser.Scene
{
    textsScale = 
    {
        "BackButton": 0.32
    }

    texts =
    {
        "BackButton": 
        { 
            pos: { x: 0.17, y: 0.94 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["BackButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
       }
    }

    constructor() 
    {
        super({ key: 'UserScene' });
    }

    preload() 
    {
        if (!LanguageManager.getInstance().hasData())
        {
            this.load.pack("localization_en", "../assets/localization/english.json");
            this.load.pack("localization_es", "../assets/localization/espanol.json")
        }

        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");
    }

    create() 
    {
        WebFont.load({
            custom: {
                families: ["FontChild"], 
                urls: ["../../css/styles.css"]
            },
            active: () => {
                if (!LanguageManager.getInstance().hasData())
                {
                    const enData = this.cache.json.get("localization_en");      
                    const esData = this.cache.json.get("localization_es");
                    
                    LanguageManager.getInstance().loadLanguage("english", enData);
                    LanguageManager.getInstance().loadLanguage("español", esData);
            
                    this.textsGroup = {};
                    // Ejemplo de crear textos
                    Object.keys(this.texts).forEach((key) =>
                    {
                        this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("User", key), this.texts[key].style);
                        this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                        this.textsGroup[key].rotation = this.texts[key].rotation;
                        //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                    });
                    LanguageManager.getInstance().onLanguageChanged("User", () =>
                    {
                        Object.keys(this.textsGroup).forEach((key) =>
                        {
                            this.textsGroup[key].text = LanguageManager.getInstance().getText("User", key);
                        });
                    });

                    this.events.once("shutdown", () =>
                    {
                        LanguageManager.getInstance().desubscribe("User");
                    });
                }
            }
        });

        AudioManager.Instance.SetActiveScene(this, false);


        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");
        Scaler.ScaleToGameH(Background);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton");
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));


        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("UserScene");
                this.scene.start("MainMenu");
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
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

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
        
        switch(button.texture.key)
        {
            case "BackButton":
                this.scene.stop("UserScene");
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