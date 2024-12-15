const LettersSprites = 
{
    w:27,
    a:1,
    s:22,
    d:4,
    r:21,
    i:10,
    j:12,
    k:13,
    l:14,
    p:19
}

class Options extends Phaser.Scene
{
    textsScale = 
    {
        "OptionsTitle": 1,
        "AudioTitle": 0.9,
        "MasterOption": 0.6,
        "SFXOption": 0.6,
        "MusicOption": 0.6,
        "ControlsTitle": 0.9,
        "UpOption": 0.5,
        "DownOption": 0.5,
        "RightOption": 0.5,
        "LeftOption": 0.5,
        "ShootOption": 0.5,
        "BackButton": 0.32,
        "P1Column": 0.32,
        "P2Column": 0.32
    }

    texts =
    {
        "OptionsTitle": 
        { 
            pos: { x: 0.1, y: 0.13 },
            center: { x: 0, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["OptionsTitle"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "AudioTitle": 
        { 
            pos: { x: 0.12, y: 0.34 },
            center: { x: 0, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["AudioTitle"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "MasterOption": 
        { 
            pos: { x: 0.25, y: 0.45 },
            center: { x: 1, y: 0.5 }, 
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["MasterOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "SFXOption": 
        { 
            pos: { x: 0.25, y: 0.545 },
            center: { x: 1, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["SFXOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "MusicOption": 
        { 
            pos: { x: 0.25, y: 0.64 },
            center: { x: 1, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["MusicOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "ControlsTitle": 
        { 
            pos: { x: 0.555, y: 0.34 },
            center: { x: 0, y: 0.5 }, 
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ControlsTitle"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "UpOption": 
        { 
            pos: { x: 0.64, y: 0.44 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["UpOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "DownOption": 
        { 
            pos: { x: 0.64, y: 0.51 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["DownOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "RightOption": 
        { 
            pos: { x: 0.64, y: 0.57 }, 
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["RightOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "LeftOption": 
        { 
            pos: { x: 0.64, y: 0.63 }, 
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LeftOption"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "ShootOption": 
        { 
            pos: { x: 0.64, y: 0.69 }, 
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ShootOption"] / textDivider) + "px",
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
        "P1Column": 
        { 
            pos: { x: 0.77, y: 0.4 }, 
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["P1Column"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "P2Column": 
        { 
            pos: { x: 0.835, y: 0.4 }, 
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["P2Column"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }
    }

    constructor() 
    {
        super({ key: 'Options' });
        this.lastScene;
        this.VolumeSliderRelation = 
        {
            min: 0.275,
            middle: 0.35,
            max: 0.43
        }
    }

    init(data)
    {
        this.lastScene = data.scene;
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        this.load.image("englishButton", "/assets/UI/Buttons/enButton.png");
        this.load.image("españolButton", "/assets/UI/Buttons/esButton.png");
        this.load.image("euskeraButton", "/assets/UI/Buttons/euButton.png");
        this.load.image("OptionsBackground", "../assets/UI/Screens/opc.png");
        this.load.spritesheet("Letters", "../assets/LetterSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.image("VolumeSlide", "../assets/UI/Buttons/volume.png")
    }

    create() 
    {
        WebFont.load({
            custom: {
                families: ['FontChild'], 
                urls: ['../../css/styles.css']
            },
            active: () => 
            {
                console.log("Font Loaded");

                this.textsGroup = {};
                // Ejemplo de crear textos
                Object.keys(this.texts).forEach((key) =>
                {
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Options", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Options", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Options", key);
                    });
                });

                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Options");
                });
            }
          });
          
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "OptionsBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(this.texts["BackButton"].pos.x * WINDOW.WIDHT, this.texts["BackButton"].pos.y * WINDOW.HEIGHT, "BackButton")
        Scaler.ScaleToGameW(back, this.textsScale["BackButton"]);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));
        back.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        back.setInteractive().on("pointerout", this.OnPointerExit.bind(this));

        let i = 0;
        LanguageManager.getInstance().getLanguages().forEach((language) =>
        {
            let key = language + "Button";
            let pos = { x: 0.89 - (0.05 * i), y: 0.09 + (0.005 * i) };
            const button = this.add.image(pos.x * WINDOW.WIDHT, pos.y * WINDOW.HEIGHT, key);
            Scaler.ScaleToGameW(button, 0.03);
            button.setOrigin(0.5, 0.5);
            button.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(-15, 15));
            button.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, button));
            button.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
            button.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
            i++;
        });

        const MasterVolumeSlide = this.add.image(this.GetSliderPosition(AudioManager.Instance.GetChannelVolume("Master")), (WINDOW.HEIGHT * 3.55)/8, "VolumeSlide");
        Scaler.ScaleToGameH(MasterVolumeSlide, 0.05);
        MasterVolumeSlide.setInteractive().on("drag", (pointer, dragX, dragY) => { this.OnDragSlide(dragX, MasterVolumeSlide, "Master"); });
        this.input.setDraggable(MasterVolumeSlide, true);

        const SFXVolumeSlide = this.add.image(this.GetSliderPosition(AudioManager.Instance.GetChannelVolume("SFX")), (WINDOW.HEIGHT * 4.35)/8, "VolumeSlide");
        Scaler.ScaleToGameH(SFXVolumeSlide, 0.05);
        SFXVolumeSlide.setInteractive().on("drag", (pointer, dragX, dragY) => { this.OnDragSlide(dragX, SFXVolumeSlide, "SFX"); });
        this.input.setDraggable(SFXVolumeSlide, true);

        const MusicVolumeSlide = this.add.image(this.GetSliderPosition(AudioManager.Instance.GetChannelVolume("Music")), (WINDOW.HEIGHT * 5.1)/8, "VolumeSlide");
        Scaler.ScaleToGameH(MusicVolumeSlide, 0.05);
        MusicVolumeSlide.setInteractive().on("drag", (pointer, dragX, dragY) => { this.OnDragSlide(dragX, MusicVolumeSlide, "Music"); });
        this.input.setDraggable(MusicVolumeSlide, true);


        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));

        
        let letterW = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.44), "Letters",LettersSprites.w);
        Scaler.ScaleToGameW(letterW, 0.026);
        let letterA = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.625), "Letters",LettersSprites.a);
        Scaler.ScaleToGameW(letterA, 0.026);
        let letterS = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.5059), "Letters",LettersSprites.s);
        Scaler.ScaleToGameW(letterS, 0.026);
        let letterD = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.57), "Letters",LettersSprites.d);
        Scaler.ScaleToGameW(letterD, 0.026);
        let letterR = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.685), "Letters",LettersSprites.r);
        Scaler.ScaleToGameW(letterR, 0.026);
        let letterI = this.add.sprite((WINDOW.WIDHT*0.830), (WINDOW.HEIGHT * 0.44), "Letters",LettersSprites.i);
        Scaler.ScaleToGameW(letterI, 0.026);
        let letterJ = this.add.sprite((WINDOW.WIDHT*0.833), (WINDOW.HEIGHT * 0.620), "Letters",LettersSprites.j);
        Scaler.ScaleToGameW(letterJ, 0.026);
        let letterK = this.add.sprite((WINDOW.WIDHT*0.832), (WINDOW.HEIGHT * 0.5059), "Letters",LettersSprites.k);
        Scaler.ScaleToGameW(letterK, 0.026);
        let letterL = this.add.sprite((WINDOW.WIDHT*0.833), (WINDOW.HEIGHT * 0.564), "Letters",LettersSprites.l);
        Scaler.ScaleToGameW(letterL, 0.026);
        let letterP = this.add.sprite((WINDOW.WIDHT*0.830), (WINDOW.HEIGHT * 0.685), "Letters",LettersSprites.p);
        Scaler.ScaleToGameW(letterP, 0.026);
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

    GetSliderPosition(volume)
    {
        // It's the formula of valueFrom0To1 but isolated the slide.x variable and used common factor WINDOW.WIDHT
        return WINDOW.WIDHT * (volume * (this.VolumeSliderRelation.max - this.VolumeSliderRelation.min) + this.VolumeSliderRelation.min);
    }

    OnDragSlide(dragX, slide, channel)
    {
        // Move the slide image and clamp it with the borders of the slider
        slide.x = this.Clamp(dragX, WINDOW.WIDHT * this.VolumeSliderRelation.min, WINDOW.WIDHT * this.VolumeSliderRelation.max);

        // Compute the volume value -> Pass the pixels value to value between 0 and 1
        var maxValue = WINDOW.WIDHT * (this.VolumeSliderRelation.max - this.VolumeSliderRelation.min);
        var valueFrom0To1 = (slide.x - this.VolumeSliderRelation.min * WINDOW.WIDHT) / (maxValue); // Never reach the exact 1 but is 0,999999999999 so anyways 

        // Important that the parametter pass in channel to this function are the names of the channels in the AudioManager
        AudioManager.Instance.SetVolume(valueFrom0To1, channel);
    }

    // I really don't know how it's possible that javaScript don't have clamp function but anyways it's simple so for don't create one file just for this generalPurpose clamp i coded here
    Clamp(value, min, max)
    {
        return Math.max(min, Math.min(value, max));
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                this.scene.stop("Options");
                this.scene.resume(this.lastScene);
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
                this.scene.stop("Options");
                this.scene.resume(this.lastScene);
                break;

            case "englishButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                LanguageManager.getInstance().changeLanguage("english");
                break;

            case "españolButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                LanguageManager.getInstance().changeLanguage("español");
                break;

            case "euskeraButton":
                AudioManager.Instance.PlayOneShoot("ChangeMenu", "SFX");
                LanguageManager.getInstance().changeLanguage("euskera");
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