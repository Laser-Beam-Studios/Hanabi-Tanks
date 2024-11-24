class Level4 extends Level
{
    // n -> number of cells in the horizontal  // m -> number of cells in the vertical
    constructor()
    {
        super(17, 13, 64, 'Level4');
    }

    //Level4 is loaded when the score is 2-0 or 0-2
    //World: Player1 is ahead
    //inverseWorld: Player2 is ahead

    preload() 
    {
        super.preload();
        console.log("Start level4");

        // To see the meaning of the characters go to "../javaScript/Levels/Level.js" and look the TilesDictionary const variable
        var world =
        [
            "◄","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","►",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","}", 
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," ","│"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," ","│"," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," ","│"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","║"," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "«","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","»"
        ];
        
        var inverseWorld =
        [
            "◄","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","►",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","}", 
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","│"," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," ","│"," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," ","│"," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," ","║"," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "«","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","»"
        ];


        super.InitWorld(world, inverseWorld);
    }

    create() 
    {
        super.create();
    }

    update() 
    {
        super.update();
    }
}