class Lobby extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Lobby' });
    }

    preload()
    {        
        this.load.image("TemplateBackground", "../assets/UI/Screens/template.png");
    }

    create()
    {

    }
}