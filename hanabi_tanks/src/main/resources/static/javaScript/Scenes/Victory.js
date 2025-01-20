class Victory extends Phaser.Scene
{
    textsScale =
    {
        "BackButton": 0.32,
        "PlayerText": 0.6,
        "UpgradesText": 0.6,
        "VictoryText": 0.6
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
        "PlayerText":
        { 
            pos: { x: 0.78, y: 0.25 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["PlayerText"] / textDivider) + "px",
                
                color: blackColor
            } 
        },
        "UpgradesText":
        { 
            pos: { x: 0.35, y: 0.75 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["UpgradesText"] / textDivider) + "px",
                
                color: blackColor
            } 
        },
        "VictoryText":
        { 
            pos: { x: 0.78, y: 0.55 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["VictoryText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
    }
    constructor() 
    {
        super({ key: 'Victory' });

        this.music;
    }

    init(data)
    {
        this.player1 = data.player1;
        this.player2 = data.player2;
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("VictoryBackground", "../assets/UI/Screens/win.png");
        this.load.spritesheet("PowerUps", "../assets/PowerUpSpriteSheet.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("Numbers", "../assets/numbersSpritesheet.png", { frameWidth: 64, frameHeight: 64 });
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
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Victory", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Victory", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Victory", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Victory");
                });
            }
        });
          
        AudioManager.Instance.SetActiveScene(this, false);

        const victory = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "VictoryBackground");
        Scaler.ScaleToGameH(victory);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton")
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        
        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
        
        let index = 0;
        let powerUps = [];
        if (this.player1.score > this.player2.score)
        {
            index = 1;
            powerUps = this.player1.powerUps;
        }
        else
        {
            index = 2;
            powerUps = this.player2.powerUps;
        }

        let winPlayer = this.add.sprite(WINDOW.WIDHT * 0.77617, WINDOW.HEIGHT * 0.36507, "Numbers", index);
        Scaler.ScaleToGameH(winPlayer, 0.09634);
        let player1Score = this.add.sprite(WINDOW.WIDHT * 0.70561, WINDOW.HEIGHT * 0.63981, "Numbers", this.player1.score);
        Scaler.ScaleToGameH(player1Score, 0.07226);
        let divider = this.add.sprite(WINDOW.WIDHT * 0.77617, WINDOW.HEIGHT * 0.63981, "Numbers", 4);
        Scaler.ScaleToGameH(divider, 0.07226);
        let player2Score = this.add.sprite(WINDOW.WIDHT * 0.84674, WINDOW.HEIGHT * 0.63981, "Numbers", this.player2.score);
        Scaler.ScaleToGameH(player2Score, 0.07226);

        // power ups

        console.log(powerUps);

        let xPosition = [0.23144, 0.48546, 0.23144, 0.48546];
        let yPosition = [0.26345, 0.26345, 0.54949, 0.54949];

        for (let i = 0; i < powerUps.lenght; i++)
        {            
            let powerUp = this.add.sprite(WINDOW.WIDHT * xPosition[i], WINDOW.HEIGHT * yPosition[i], "PowerUps", powerUps[i]);
            Scaler.ScaleToGameH(powerUp, 0.12043*2.8);
        }
        // let powerUp2 = this.add.sprite(WINDOW.WIDHT * 0.48546, WINDOW.HEIGHT * 0.26345, "PowerUps", powerUps[1]);
        // Scaler.ScaleToGameH(powerUp2, 0.12043*2.8);
        // if (powerUps.lenght == 2)
        //     return;
        // let powerUp3 = this.add.sprite(WINDOW.WIDHT * 0.23144, WINDOW.HEIGHT * 0.54949, "PowerUps", powerUps[2]);
        // Scaler.ScaleToGameH(powerUp3, 0.12043*2.8);
        // if (powerUps.lenght == 3)
        //     return;
        // let powerUp4 = this.add.sprite(WINDOW.WIDHT * 0.48546, WINDOW.HEIGHT * 0.54949, "PowerUps", powerUps[3]);
        // Scaler.ScaleToGameH(powerUp4, 0.12043*2.8);

        // Increment the number of victories
        var THIS = this;
        $.ajax(
        {
            type: "PUT",
            url: USERS_BASE_URL + "/" + THIS.scene.get("ChatChill").username,
            data: { },
            success: () => 
            { 
                console.log("Number Of Victories of user: " + THIS.scene.get("ChatChill").username + " Increment");
            },
        });

        CommsManager.getInstance().addOrderCallback(Orders.Disconnect, true, () =>
            {
                return this.scene.key;
            }, true)
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
                this.scene.stop("Victory");
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
                this.scene.stop("Victory");
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