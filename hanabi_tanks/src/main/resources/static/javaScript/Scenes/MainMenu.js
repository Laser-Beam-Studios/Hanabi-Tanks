const font = "FontChild";
const blackColor = "#000000";

const styleOptions = 
{
    fontStyle:
    {
        bold: "bold",
        italic: "italic",
        boldItalic: "bold italic"
    }
}

const texts =
{
    "PlayButton": 
    { 
        x: 0.82, 
        y: 0.75, 
        scale: 0.32, 
        style: 
        {
            fontFamily: font,
            //fontStyle: styleOptions.fontStyle.bold,
            color: blackColor
        } 
    },
    "OptionsButton": 
    { 
        x: 0.82, 
        y: 0.85, 
        scale: 0.32 
    },
    "CreditsButton": 
    { 
        x: 0.82, 
        y: 0.95, 
        scale: 0.32 
    }
}

class MainMenu extends Phaser.Scene
{
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
                    
                    LanguageManager.getInstance().loadLanguage("english", enData);
            
                    this.textsGroup = {};
                    // Ejemplo de crear textos
                    Object.keys(texts).forEach((key) =>
                    {
                        this.textsGroup[key] = this.add.text(texts[key].x * WINDOW.WIDHT, texts[key].y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("MainMenu", key), texts[key].style);
                        this.textsGroup[key].setOrigin(0.5, 0.5);
                        Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                    });
                    LanguageManager.getInstance().onLanguageChanged(() =>
                    {
                        for (let key in Object.keys(this.textsGroup))
                        {
                            this.textsGroup[key].setText(LanguageManager.getInstance().getText("MainMenu", key));
                        }
                    })
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

        const play = this.add.image(texts["PlayButton"].x * WINDOW.WIDHT, texts["PlayButton"].y * WINDOW.HEIGHT, "PlayButton");
        Scaler.ScaleToGameW(play, texts["PlayButton"].scale);
        play.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, play));
        play.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        play.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const credits = this.add.image(texts["CreditsButton"].x * WINDOW.WIDHT, texts["CreditsButton"].y * WINDOW.HEIGHT, "CreditsButton");
        Scaler.ScaleToGameW(credits, texts["CreditsButton"].scale);
        credits.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, credits));
        credits.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        credits.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        const options = this.add.image(texts["OptionsButton"].x * WINDOW.WIDHT, texts["OptionsButton"].y * WINDOW.HEIGHT, "OptionsButton");
        Scaler.ScaleToGameW(options, texts["CreditsButton"].scale);
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