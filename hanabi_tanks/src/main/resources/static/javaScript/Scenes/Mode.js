class Mode extends Phaser.Scene
{
    textsScale =
    {
        "modeText": 0.35,
        "ModeTitle": 0.85,
        "BackButton": 0.32,
        "LocalButton": 0.32,
        "CreateLobby": 0.32,
        "JoinLobby": 0.32,
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
        "modeText":
        { 
            pos: { x: 0.5, y: 0.3 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["modeText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "ModeTitle":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ModeTitle"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "LocalButton":
        { 
            pos: { x: 0.3, y: 0.5 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LocalButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "CreateLobby":
        { 
            pos: { x: 0.7, y: 0.5 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["CreateLobby"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "JoinLobby":
        { 
            pos: { x: 0.5, y: 0.8 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["JoinLobby"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }     
    }
    constructor() 
    {
        super({ key: 'Mode' });
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("ModeBackground", "../assets/UI/Screens/template.png");
        this.load.image("CreateLobby", "../assets/UI/Buttons/back.png");
        this.load.image("LocalButton", "../assets/UI/Buttons/back.png");
        this.load.image("JoinLobby", "../assets/UI/Buttons/back.png");


        this.load.html("InputCode", "../html/inputCode.html");
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
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Mode", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Mode", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Mode", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Mode");
                });
            }
        });
          
        AudioManager.Instance.SetActiveScene(this, false);        

        const mode = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "ModeBackground");        
        Scaler.ScaleToGameW(mode);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton");
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const local = this.add.image(this.texts["LocalButton"].pos.x * WINDOW.WIDHT, this.texts["LocalButton"].pos.y * WINDOW.HEIGHT, "LocalButton");
        Scaler.ScaleToGameW(local, this.textsScale["LocalButton"]);
        local.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, local));
        local.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        local.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const online = this.add.image(this.texts["CreateLobby"].pos.x * WINDOW.WIDHT, this.texts["CreateLobby"].pos.y * WINDOW.HEIGHT, "CreateLobby");
        Scaler.ScaleToGameW(online, this.textsScale["CreateLobby"]);
        online.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, online));
        online.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        online.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const join = this.add.image(this.texts["JoinLobby"].pos.x * WINDOW.WIDHT, this.texts["JoinLobby"].pos.y * WINDOW.HEIGHT, "JoinLobby");
        Scaler.ScaleToGameW(join, this.textsScale["JoinLobby"]);
        join.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, join));
        join.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        join.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        this.inputCode = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT/2).createFromCache("InputCode");
        this.inputCode.addListener("click");

        CommsManager.getInstance().addOrderCallback(Orders.CreateLobby, true, null);

        CommsManager.getInstance().addOrderCallback(Orders.CreatedLobby, false, (additionalInfo) =>
        {            
            AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
            console.log(additionalInfo);
            InterSceneDictionary.getInstance().update("lobbyCode", additionalInfo);
            InterSceneDictionary.getInstance().update("host", true);
            InterSceneDictionary.getInstance().update("numPlayers", 1);
            this.scene.stop("Mode");
            this.scene.start("Lobby");
        });

        CommsManager.getInstance().addOrderCallback(Orders.JoinLobby, true, () =>
        {
            return this.code;
        })

        CommsManager.getInstance().addOrderCallback(Orders.JoinedLobby, false, (additionalInfo) =>
        {
            AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
            console.log(additionalInfo);
            InterSceneDictionary.getInstance().update("numPlayers", additionalInfo);
            InterSceneDictionary.getInstance().update("host", false);
            this.scene.stop("Mode");
            this.scene.start("Lobby");
        });
        
        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));

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
                this.scene.stop("Mode");
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
                this.scene.stop("Mode");
                this.scene.start("MainMenu");
                break;
            case "LocalButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Mode");
                this.scene.start("Level1");
                break;
            case "CreateLobby":
                CommsManager.getInstance().send(Orders.CreateLobby);
                break; 
            case "JoinLobby":
                const code = this.inputCode.getChildByName("lobbyCode").value;
                console.log(code);
                if (code) 
                {       
                    this.code = code;        
                    InterSceneDictionary.getInstance().update("lobbyCode", this.code);
                    CommsManager.getInstance().send(Orders.JoinLobby);
                }
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