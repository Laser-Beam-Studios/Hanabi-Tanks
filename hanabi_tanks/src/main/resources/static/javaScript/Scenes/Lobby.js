class Lobby extends Phaser.Scene
{
    textsScale =
    {
        "LobbyText": 0.35,
        "StartGame": 0.32
    }
    
    texts = 
    {
        "LobbyText":
        { 
            pos: { x: 0.5, y: 0.3 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LobbyButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }
    }

    startGame = 
    { 
        pos: { x: 0.25, y: 0.15 },
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

    preload()
    {        
        this.load.image("TemplateBackground", "../assets/UI/Screens/template.png");

        if (InterSceneDictionary.getInstance().get("host"))            
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
            }
        });

        const lobby = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");        
        Scaler.ScaleToGameW(lobby);
        
        InterSceneDictionary.getInstance().update("online", true);

        if (InterSceneDictionary.getInstance().get("host"))
        {
            const back = this.add.image(this.startGame.pos.x * WINDOW.WIDHT, this.startGame.pos.y * WINDOW.HEIGHT, "StartGame");
            Scaler.ScaleToGameW(back, this.textsScale["StartGame"]);
            back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
            back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
            back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
            
            this.startGameText = this.add.text(this.startGame.pos.x * WINDOW.WIDHT, this.startGame.pos.x * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Lobby", "StartGame"), this.startGame.style);
            LanguageManager.getInstance().onLanguageChanged("Lobby", () =>
            {
                this.startGameText.text = LanguageManager.getInstance().getText("Lobby", "StartGame");
            })
            this.numPlayersNumber = InterSceneDictionary.getInstance().get("numPlayers");
            this.numPlayers = this.add.text(String(this.numPlayersNumber));
            CommsManager.getInstance().addOrderCallback(Orders.JoinLobby, false, () =>
            {
                this.numPlayersNumber++;
                InterSceneDictionary.getInstance().update("numPlayers", this.numPlayersNumber);
                this.numPlayers.text = String(this.numPlayersNumber);
            })

            CommsManager.getInstance().addOrderCallback(Orders.Disconnect, false, () =>
            {
                this.numPlayersNumber--;
                InterSceneDictionary.getInstance().update("numPlayers", this.numPlayersNumber);
                this.numPlayers.text = String(this.numPlayersNumber);
            })
            
        }
        else{
            CommsManager.getInstance().addOrderCallback(Orders.StartGame,false,()=>
            {
                this.scene.stop("Lobby");
                this.scene.start("Level1");
            })
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
        
        switch(button.texture.key)
        {
            case "StartGame":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                CommsManager.getInstance().send(Orders.StartGame);
                this.scene.stop("Lobby");
                this.scene.start("Level1");
                break;
                
            default:
                console.log("ERROR_IN_CLICK_BUTTON: UNKNOWN_BUTTON_KEY: " + button.texture.key);
                break;
        }
    }
}