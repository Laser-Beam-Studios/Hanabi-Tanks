class Ranking extends Phaser.Scene
{
    textsScale =
    {
        "BackButton": 0.32,
        "Title": 0.32,
        "players": 0.32
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
        "Title":
        { 
            pos: { x: 0.5, y: 0.06 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["Title"] / textDivider) + "px",                
                color: blackColor
            } 
        },
        "playerTemplate":
        { 
            pos: { x: 0.4, y: 0.1 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["players"] / textDivider) + "px",                
                color: blackColor
            }
        }
    }

    constructor() 
    {
        super({ key: 'Ranking' });
        this.textsGroup = {};
        this.sizeOfRanking = 10;
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");
    }

    create() 
    {
        let THIS = this;
        WebFont.load({
            custom: {
                families: ['FontChild'], 
                urls: ['../../css/styles.css']
            },
            active: () => {
                console.log("Font Loaded");
                Object.keys(this.texts).forEach((key) =>
                {
                    THIS.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Ranking", key), this.texts[key].style);
                    THIS.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    THIS.textsGroup[key].rotation = this.texts[key].rotation;                    
                });

                for (var i = 0; i < THIS.sizeOfRanking; i++)
                {
                    THIS.textsGroup[i.toString()] = this.add.text(this.texts["playerTemplate"].pos.x * WINDOW.WIDHT, (this.texts["playerTemplate"].pos.y + i * 0.06) * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Ranking", "playerTemplate"), this.texts["playerTemplate"].style);
                    THIS.textsGroup[i.toString()].setOrigin(this.texts["playerTemplate"].center.x, this.texts["playerTemplate"].center.y);
                    THIS.textsGroup[i.toString()].rotation = this.texts["playerTemplate"].rotation;
                }

                LanguageManager.getInstance().onLanguageChanged("Ranking", () =>
                {
                    Object.keys(THIS.textsGroup).forEach((key) =>
                    {
                        THIS.textsGroup[key].text = LanguageManager.getInstance().getText("Ranking", key);
                    });
                });


                THIS.LoadRanking(THIS);
                

    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Ranking");
                });
            }
        });
    
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");
        Scaler.ScaleToGameW(background);

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
                this.scene.stop("Ranking");
                this.scene.start("MainMenu");
                break;
            case Phaser.Input.Keyboard.KeyCodes.R:
                console.log("Ranking reload");
                this.LoadRanking();
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    LoadRanking(THIS)
    {
        $.get(USERS_BASE_URL + "/ranking", { sizeOfRanking: THIS.sizeOfRanking }, (data, status) =>
            {
                if (status == "success")
                {
                    console.log(data);
                    console.log(data[0].username);
                    for (var i = 0; i < THIS.sizeOfRanking; i++)
                    {
                        //THIS.textsGroup[i.toString()].setText();
                    }
                }
            });
    }

    PrintRanking()
    {

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