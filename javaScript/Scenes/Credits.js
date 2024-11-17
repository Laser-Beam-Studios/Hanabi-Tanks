class Credits extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Credits' });
    }

    preload() 
    {
        this.load.image("credits", "../assets/credits.png");
    }

    create() 
    {
        const credits = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "credits");
    }

    update() 
    {

    }

}