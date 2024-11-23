class Level5 extends Level
{
    // n -> number of cells in the horizontal  // m -> number of cells in the vertical
    constructor()
    {
        super(15, 11, 64, 'Level5');
    }

    //Level5 is loaded when the score is 2-1 or 1-2
    //World: Player1 is ahead
    //inverseWorld: Player2 is ahead

    preload() 
    {
        super.preload();

        // To see the meaning of the characters go to "../javaScript/Levels/Level.js" and look the TilesDictionary const variable
        var world =
        [            
            "◄","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","►",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," ","║"," "," "," "," "," "," "," ","║"," "," ","}",
            "{"," "," ","║"," "," "," ","═"," "," "," ","║"," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," ","═","═","▬","▬","▬","═","═"," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," ","│"," "," "," ","═"," "," "," ","║"," "," ","}",
            "{"," "," ","│"," "," "," "," "," "," "," ","║"," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "«","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","»"            
        ];


        var inverseWorld =
        [
            "◄","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","►",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," ","║"," "," "," "," "," "," "," ","║"," "," ","}",
            "{"," "," ","║"," "," "," ","═"," "," "," ","║"," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," ","═","═","▬","▬","▬","═","═"," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," ","║"," "," "," ","═"," "," "," ","│"," "," ","}",
            "{"," "," ","║"," "," "," "," "," "," "," ","│"," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "«","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","»" 
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