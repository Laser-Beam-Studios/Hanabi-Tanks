class Level6 extends Level
{
    // n -> number of cells in the horizontal  // m -> number of cells in the vertical
    constructor()
    {
        super(15, 11, 64, 'Level6');
    }

    //Level6 is loaded when the score is 2-2 

    preload() 
    {
        super.preload();

        // To see the meaning of the characters go to "../javaScript/Levels/Level.js" and look the TilesDictionary const variable
        var world =
        [
            
            "◄","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","▲","►",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," ","│"," "," "," "," "," "," ","}",
            "{"," "," "," "," "," "," "," "," "," "," "," "," "," ","}",
            "«","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","▼","»"
            
        ];

        super.InitWorld(world);
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