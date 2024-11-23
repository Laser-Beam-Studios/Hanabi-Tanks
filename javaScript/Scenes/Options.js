class Options extends Phaser.Scene
{
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
        this.load.image("OptionsBackground", "../assets/UI/Screens/opc.png");
        this.load.image("VolumeSlide", "../assets/UI/Buttons/volume.png")
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "OptionsBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton")
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));



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
                this.scene.stop("Options");
                this.scene.resume(this.lastScene);
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