class Credits extends Phaser.Scene
{
    textsScale =
    {
        "BackButton": 0.32,
        "creatorsText": 0.35,
        "CreditsTitle": 0.85
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
        },
        "alvarjimText":
        { 
            pos: { x: 0.5, y: 0.3 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["creatorsText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "makarovText":
        { 
            pos: { x: 0.5, y: 0.45 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["creatorsText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "pepiurText":
        { 
            pos: { x: 0.5, y: 0.6 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["creatorsText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "pepiurText2":
        { 
            pos: { x: 0.5, y: 0.65 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["creatorsText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "hotdogText":
        { 
            pos: { x: 0.5, y: 0.75 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["creatorsText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "CreditsTitle":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["CreditsTitle"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
    }
    constructor() 
    {
        super({ key: 'Credits' });
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("CreditsBackground", "../assets/UI/Screens/template.png");
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
                this.textsGroup = {};
                Object.keys(this.texts).forEach((key) =>
                {
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Credits", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Credits", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Credits", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Credits");
                });

                CommsManager.getInstance().addOrderCallback(Orders.Disconnect, true, () =>
                    {
                        return this.scene.key;
                    }, true)
            }
        });
          
        AudioManager.Instance.SetActiveScene(this, false);        

        const credits = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "CreditsBackground");        
        Scaler.ScaleToGameW(credits);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton");
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
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
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
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