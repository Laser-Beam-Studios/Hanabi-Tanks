class Tutorial extends Phaser.Scene
{
    textsScale =
    {
        "BackButton": 0.32,
        "TutorialTitle": 0.85,
        "TutorialText": 0.25,
        "ParagraphTitle": 0.32        
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
                color: blackColor
            } 
        },
        "TutorialTitle":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialTitle"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "HowToPlay":
        { 
            pos: { x: 0.5, y: 0.25 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ParagraphTitle"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "HowToPlayText":
        { 
            pos: { x: 0.5, y: 0.3 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "HowToPlayText2":
        { 
            pos: { x: 0.5, y: 0.35 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "HowToPlayText3":
        { 
            pos: { x: 0.5, y: 0.40 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUpTitle":
        { 
            pos: { x: 0.5, y: 0.45 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ParagraphTitle"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp1":
        { 
            pos: { x: 0.5, y: 0.50 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp2":
        { 
            pos: { x: 0.5, y: 0.55 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp3":
        { 
            pos: { x: 0.5, y: 0.60 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp3_2":
        { 
            pos: { x: 0.5, y: 0.65 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp4":
        { 
            pos: { x: 0.5, y: 0.70 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp4_2":
        { 
            pos: { x: 0.5, y: 0.75 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "PowerUp5":
        { 
            pos: { x: 0.5, y: 0.80 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["TutorialText"] / textDivider) + "px",                
                color: blackColor
            } 
        }
    }
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

        this.load.image("TutorialBackground", "../assets/UI/Screens/template.png");
        this.load.image("MainMenuButton", "../assets/UI/Buttons/mainMenu.png");
        this.load.image("PowerUps", "../assets/PowerUpSpriteSheet.png");
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
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Tutorial", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;                    
                });
                LanguageManager.getInstance().onLanguageChanged("Tutorial", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Tutorial", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Tutorial");
                });
            }
        });
    
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TutorialBackground");
        Scaler.ScaleToGameW(background);

        const powerups = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT*0.87, "PowerUps");
        Scaler.ScaleToGameW(powerups, 0.4);

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