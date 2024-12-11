class Scaler
{
    constructor() { }

    static ScaleToGameW(object, percentage = 1)
    {
        object.displayWidth = game.config.width * percentage;
        object.scaleY = object.scaleX;
    }
    static ScaleToGameH(object, percentage = 1)
    {
        object.displayHeight = game.config.height * percentage;
        object.scaleX = object.scaleY;
    }
}