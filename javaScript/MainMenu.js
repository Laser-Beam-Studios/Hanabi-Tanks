class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'MainMenu' });
    }

    preload() 
    {
        this.load.image("botonPrueba", "../assets/Boton_prueba.png");
        this.load.image("botonPrueba2", "../assets/Boton_prueba.png");
    }

    create() 
    {
        const botonPrueba = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/4, "botonPrueba");
        botonPrueba.scale = 0.5;
        botonPrueba.setInteractive().on("pointerdown", this.OnClickOnButton.bind(null, botonPrueba));

        const botonPrueba2 = this.add.image(WINDOW.WIDHT/2, (WINDOW.HEIGHT * 3)/4, "botonPrueba2");
        botonPrueba2.scale = 0.5;
        botonPrueba2.setInteractive().on("pointerdown", this.OnClickOnButton.bind(null, botonPrueba2));
    }

    OnClickOnButton(button)
    {
        console.log("BotonPruebaPulsado " + button.texture.key);

        switch(button.texture.key)
        {
            case "botonPrueba":
                console.log("FUNCIONA Y NO ME ESTOY VOLVIENDO ESQUIZO");
            break;
            case "botonPrueba2":
                console.log("QUE VIVA ESPAÑA");
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