class Lobby extends Phaser.Scene
{
    textsScale =
    {
        "LobbyText": 0.85,
        "StartGame": 0.32,
        "BackButton": 0.32,
        "NumPlayers": 0.32
    }
    
    texts = 
    {
        "LobbyText":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LobbyText"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
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
        "NumPlayers":
        {
            pos: { x: 0.49, y: 0.4 },
            center: { x: 1, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["NumPlayers"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "CodeText":
        {
            pos: { x: 0.49, y: 0.6 },
            center: { x: 1, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["NumPlayers"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }
    }

    startGame = 
    { 
        pos: { x: 0.83, y: 0.94 },
        center: { x: 0.5, y: 0.5 },
        rotation: Phaser.Math.DegToRad(0),
        style: 
        {
            fontFamily: font,
            fontSize: String(WINDOW.HEIGHT * this.textsScale["StartGame"] / textDivider) + "px",
            //fontStyle: styleOptions.fontStyle.bold,
            color: blackColor
        } 
    }

    numPlayersInfo = 
    {
        pos: { x: 0.5, y: 0.5 },
        center: { x: 0.5, y: 0.5 },
        rotation: Phaser.Math.DegToRad(-4),
        style: 
        {
            fontFamily: font,
            fontSize: String(WINDOW.HEIGHT * this.textsScale["StartGame"] / textDivider) + "px",
            //fontStyle: styleOptions.fontStyle.bold,
            color: blackColor
        } 
    }

    constructor() 
    {
        super({ key: 'Lobby' });
    }

    update()
    {
        console.log(this.numPlayersNumber);
    }

    preload()
    {        
        this.load.image("TemplateBackground", "../assets/UI/Screens/template.png");
          
        this.load.image("StartGame", "../assets/UI/Buttons/back.png");
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
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Lobby", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Lobby", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Lobby", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Lobby");
                });

                this.numPlayersNumber = InterSceneDictionary.getInstance().get("numPlayers");
                this.numPlayers = this.add.text(0.51 * WINDOW.WIDHT, this.texts["NumPlayers"].pos.y * WINDOW.HEIGHT, String(this.numPlayersNumber), this.texts["NumPlayers"].style);
                this.numPlayers.setOrigin(0, 0.5);

                const codeText = this.add.text(0.51 * WINDOW.WIDHT, this.texts["CodeText"].pos.y * WINDOW.HEIGHT, InterSceneDictionary.getInstance().get("lobbyCode"), this.texts["CodeText"].style);
                codeText.setOrigin(0, 0.5);
            }
        });

        const lobby = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");        
        Scaler.ScaleToGameW(lobby);
        
        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton");
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        CommsManager.getInstance().addOrderCallback(Orders.JoinLobby, false, () =>
            {
                this.UpdateNumPlayers(true)
            })

            CommsManager.getInstance().addOrderCallback(Orders.Disconnect, true, () =>
                {
                    return this.scene.key;
                }, true)

            CommsManager.getInstance().addOrderCallback(Orders.Disconnect, false, () =>
            {
                console.log("Someone disconnected");
                this.UpdateNumPlayers(false);
            })

            CommsManager.getInstance().addOrderCallback(Orders.Host, false, () =>
            {
                this.CreateHost();
            })

        if (InterSceneDictionary.getInstance().get("host"))
        {
            this.CreateHost();            
        }
        else{
            CommsManager.getInstance().addOrderCallback(Orders.StartGame,false,()=>
            {
                this.scene.stop("Lobby");
                this.scene.start("Level1");
            })
        }        
    }

    CreateHost()
    {
        const start = this.add.image(this.startGame.pos.x * WINDOW.WIDHT, this.startGame.pos.y * WINDOW.HEIGHT, "StartGame");
        Scaler.ScaleToGameW(start, this.textsScale["StartGame"]);
        start.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, start));
        start.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        start.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        
        this.startGameText = this.add.text(this.startGame.pos.x * WINDOW.WIDHT, this.startGame.pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Lobby", "StartGame"), this.startGame.style);
        this.startGameText.setOrigin(this.startGame.center.x, this.startGame.center.y);
        LanguageManager.getInstance().onLanguageChanged("Lobby", () =>
        {
            this.startGameText.text = LanguageManager.getInstance().getText("Lobby", "StartGame");
        })
    }

    UpdateNumPlayers(more)
    {
        if (more)
            this.numPlayersNumber++;
        else
            this.numPlayersNumber--;

        InterSceneDictionary.getInstance().update("numPlayers", this.numPlayersNumber);
        this.numPlayers.text = String(this.numPlayersNumber);  
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
        
        switch(button.texture.key)
        {
            case "StartGame":
                if (this.numPlayersNumber < 2)
                    return;
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                CommsManager.getInstance().send(Orders.StartGame);
                this.scene.stop("Lobby");
                this.scene.start("Level1");
                break;

            case "BackButton":
                CommsManager.getInstance().send(Orders.Disconnect);       
                break;         
                
            default:
                console.log("ERROR_IN_CLICK_BUTTON: UNKNOWN_BUTTON_KEY: " + button.texture.key);
                break;
        }
    }
}