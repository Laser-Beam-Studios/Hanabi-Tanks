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
    constructor() 
    {
        super({ key: 'Options' });
        this.lastScene;
    }

    init(data)
    {
        this.lastScene = data.scene;
    }

    preload() 
    {
        this.load.image("OptionsBackground", "../assets/UI/Screens/opc.png");
        this.load.spritesheet("Letters", "../assets/LetterSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this, false);

        const background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "OptionsBackground");
        Scaler.ScaleToGameW(background);

        const back = this.add.image(WINDOW.WIDHT/6, (WINDOW.HEIGHT * 14)/15, "BackButton")
        Scaler.ScaleToGameW(back, 0.32);
        back.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, back));

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));

        
        let letterW = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.44), "Letters",LettersSprites.w);
        Scaler.ScaleToGameW(letterW, 0.026);
        let letterA = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.57), "Letters",LettersSprites.a);
        Scaler.ScaleToGameW(letterA, 0.026);
        let letterS = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.5059), "Letters",LettersSprites.s);
        Scaler.ScaleToGameW(letterS, 0.026);
        let letterD = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.625), "Letters",LettersSprites.d);
        Scaler.ScaleToGameW(letterD, 0.026);
        let letterR = this.add.sprite((WINDOW.WIDHT*0.765), (WINDOW.HEIGHT * 0.685), "Letters",LettersSprites.r);
        Scaler.ScaleToGameW(letterR, 0.026);
        let letterI = this.add.sprite((WINDOW.WIDHT*0.830), (WINDOW.HEIGHT * 0.44), "Letters",LettersSprites.i);
        Scaler.ScaleToGameW(letterI, 0.026);
        let letterJ = this.add.sprite((WINDOW.WIDHT*0.833), (WINDOW.HEIGHT * 0.568), "Letters",LettersSprites.j);
        Scaler.ScaleToGameW(letterJ, 0.026);
        let letterK = this.add.sprite((WINDOW.WIDHT*0.832), (WINDOW.HEIGHT * 0.5059), "Letters",LettersSprites.k);
        Scaler.ScaleToGameW(letterK, 0.026);
        let letterL = this.add.sprite((WINDOW.WIDHT*0.833), (WINDOW.HEIGHT * 0.620), "Letters",LettersSprites.l);
        Scaler.ScaleToGameW(letterL, 0.026);
        let letterP = this.add.sprite((WINDOW.WIDHT*0.830), (WINDOW.HEIGHT * 0.685), "Letters",LettersSprites.p);
        Scaler.ScaleToGameW(letterP, 0.026);


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