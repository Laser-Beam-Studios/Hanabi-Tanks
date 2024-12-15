const font = "FontChild";
const blackColor = "#000000";

const textDivider = 9.0;

const styleOptions = 
{
    fontStyle:
    {
        bold: "bold",
        italic: "italic",
        boldItalic: "bold italic"
    }
}

class MainMenu extends Phaser.Scene
{
    textsScale = 
    {
        "PlayButton": 0.32,
        "OptionsButton": 0.32,
        "CreditsButton": 0.32
    }

    texts =
    {
        "PlayButton": 
        { 
            pos: { x: 0.82, y: 0.75 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["PlayButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
       },
       "OptionsButton": 
       { 
            pos: { x: 0.82, y: 0.85 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["OptionsButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "CreditsButton": 
        { 
            pos: { x: 0.82, y: 0.95 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["CreditsButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }
    }

    constructor() 
    {
        super({ key: 'MainMenu' });

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
    }

    preload() 
    {
        if (!LanguageManager.getInstance().hasData())
        {
            this.load.pack("localization_en", "/assets/localization/english.json");
            this.load.pack("localization_es", "/assets/localization/español.json")
        }
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("MainMenuBackground", "../assets/UI/Screens/mainMenu.png")
        this.load.image("PlayButton", "../assets/UI/Buttons/play.png");
        this.load.image("OptionsButton", "../assets/UI/Buttons/options.png");
        this.load.image("CreditsButton", "../assets/UI/Buttons/credits.png");
        this.load.image("BackButton", "../assets/UI/Buttons/back.png"); // This is load here for used in the other menu scenes
        
        // Song
        this.load.audio("Tanks_Party_A", "../assets/Audio/Music/TanksParty_PART_A.mp3");
        this.load.audio("Tanks_Party_B", "../assets/Audio/Music/TanksParty_PART_B.mp3");
        this.load.audio("Tanks_Party_C", "../assets/Audio/Music/TanksParty_PART_C.mp3");
        this.load.audio("Tanks_Party_D", "../assets/Audio/Music/TanksParty_PART_D.mp3");
        this.load.audio("Tanks_Party_E", "../assets/Audio/Music/TanksParty_PART_E.mp3");
        // SFX
        this.load.audio("ChangeMenu", "../assets/Audio/SFX/UI/ChangeMenu.mp3");
        this.load.audio("EnterButton", "../assets/Audio/SFX/UI/EnterOverButton.mp3");
        this.load.audio("ExitButton", "../assets/Audio/SFX/UI/ExitOverButton.mp3");
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
                        this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("MainMenu", key), this.texts[key].style);
                        this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                        this.textsGroup[key].rotation = this.texts[key].rotation;
                        //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                    });
                    LanguageManager.getInstance().onLanguageChanged("MainMenu", () =>
                    {
                        Object.keys(this.textsGroup).forEach((key) =>
                        {
                            this.textsGroup[key].text = LanguageManager.getInstance().getText("MainMenu", key);
                        });
                    });

                    this.events.once("shutdown", () =>
                    {
                        LanguageManager.getInstance().desubscribe("MainMenu");
                    });
                }
            }
        });

        AudioManager.Instance.SetActiveScene(this, false);

        if (this.musicController == null)
        {
            this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
            this.musicController.Play();
        }
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));


        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "MainMenuBackground");
        Scaler.ScaleToGameH(Background);

        const play = this.add.image(this.texts["PlayButton"].pos.x * WINDOW.WIDHT, this.texts["PlayButton"].pos.y * WINDOW.HEIGHT, "PlayButton");
        Scaler.ScaleToGameW(play, this.textsScale["PlayButton"]);
        play.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, play));
        play.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        play.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const credits = this.add.image(this.texts["CreditsButton"].pos.x * WINDOW.WIDHT, this.texts["CreditsButton"].pos.y * WINDOW.HEIGHT, "CreditsButton");
        Scaler.ScaleToGameW(credits, this.textsScale["CreditsButton"]);
        credits.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, credits));
        credits.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        credits.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const options = this.add.image(this.texts["OptionsButton"].pos.x * WINDOW.WIDHT, this.texts["OptionsButton"].pos.y * WINDOW.HEIGHT, "OptionsButton");
        Scaler.ScaleToGameW(options, this.textsScale["CreditsButton"]);
        options.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, options));
        options.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        options.setInteractive().on("pointerout", this.OnPointerExit.bind(this))
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

    OnMusicPartEnds(last)
    {
        var lastIdx;
        for (var i = 0; i < this.songsParts.length; i++)
        {
            if(this.songsParts[i] == last) 
            {
                lastIdx = i;
                break;
            }
        }

        var randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        while(randomPartIdx == lastIdx)
        {
            randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        }
        
        this.musicController = AudioManager.Instance.CreateInstance(this.songsParts[randomPartIdx], "Music");
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, this.songsParts[randomPartIdx]));
        this.musicController.Play();
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
        
        switch(button.texture.key)
        {
            case "PlayButton":
                this.scene.stop("MainMenu");
                this.scene.start("Level1");
                break;
            case "CreditsButton":
                this.scene.stop("MainMenu");
                this.scene.start("Credits");
                break;
            case "OptionsButton":
                this.scene.pause("MainMenu");
                this.scene.launch("Options", { scene: "MainMenu"});
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