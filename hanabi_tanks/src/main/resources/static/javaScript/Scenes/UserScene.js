class UserScene extends Phaser.Scene
{
    textsScale = 
    {
        "BackButton": 0.32,
        "UserText": 0.7,
        "Victories": 0.7,
        "Title": 1.0
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
       "UserText":
       {
            pos: { x: 0.25, y: 0.35 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["UserText"] / textDivider) + "px",
                color: blackColor
            } 
       },
       "Victories":
       {
            pos: { x: 0.25, y: 0.65 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["Victories"] / textDivider) + "px",
                color: blackColor
            } 
       },
       "Title":
       {
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["Title"] / textDivider) + "px",
                color: blackColor
            } 
       }
    }

    constructor() 
    {
        super({ key: 'UserScene' });

        this.username;
    }

    preload() 
    {
        if (!LanguageManager.getInstance().hasData())
        {
            this.load.pack("localization_en", "../assets/localization/english.json");
            this.load.pack("localization_es", "../assets/localization/espanol.json")
        }

        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("TrashImage", "../assets/trash.png");
    }

    create() 
    {
        var THIS = this;
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

                    THIS.username = THIS.scene.get("ChatChill").username;
                    var userNameText = THIS.textsGroup["UserText"];
                    var Victories = this.textsGroup["Victories"];

                    $.get(USERS_BASE_URL + "/" + THIS.username, { }, (data, status) =>
                    {
                        if (status == "success")
                        {
                            console.log("User: " + data.username + " has won " + Victories + " times");
                            
                            Victories.setText(Victories._text + data.numberOfVictories);
                            userNameText.setText(userNameText._text + THIS.username);
                        }
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

        const trash = this.add.image(WINDOW.WIDHT * 0.8, WINDOW.HEIGHT * 0.5, "TrashImage");
        Scaler.ScaleToGameW(trash, 0.32);
        trash.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, trash));
        trash.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        trash.setInteractive().on("pointerout", this.OnPointerExit.bind(this));


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
            case "TrashImage":
                var THIS = this;
                $.ajax(
                {
                    type: "DELETE",
                    url: USERS_BASE_URL + "/" + THIS.username,
                    success: () => 
                    { 
                        console.log("User Deleted");
                        clearInterval(THIS.scene.get("ChatChill").UpdateChatIntervalID);
                        clearInterval(THIS.scene.get("ChatChill").UpdateUsersIntervalID);
                        THIS.scene.stop("UserScene");
                        THIS.scene.stop("ChatChill");
                        THIS.scene.start("Login");
                    },
                });
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