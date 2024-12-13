class Text
{
    constructor(name, scene, posX = 0, posY = 0)
    {
        this.pos = { x: posX, Y: posY };
        this.name = name;
        this.scene = scene;

        this.updateText();
    }

    updateText()
    {
        this.text = LanguageManager.getInstance().getText(this.scene, this.name);
    }
}