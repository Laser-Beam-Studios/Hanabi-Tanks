const FloorType =
{
    upLeft: 0,
    up: 1,
    upRight: 2,
    left: 3,
    center: 4,
    right: 5,
    downLeft: 6,
    down: 7,
    downRight: 8
}

const State1 =
{
    horizontal: 9,
    vertical: 10,
    up: 11,
    down: 12,
    left: 13,
    right: 14
}

const State2 =
{
    horizontal: 15,
    vertical: 16,
    up: 17,
    down: 18,
    left: 19,
    right: 20
}

const State3 =
{
    horizontal: 21,
    vertical: 22,
    up: 23,
    down: 24,
    left: 25,
    right: 26
}

const State4 =
{
    horizontal: 27,
    vertical: 28,
    up: 29,
    down: 30,
    left: 31,
    right: 32
}

const PaperType = 
{
    State1: State1,
    State2: State2,
    State3: State3,
    State4: State4
}

const WallType =
{
    upLeft: 33,
    upRight: 34,
    downLeft: 35,
    downRight: 36,
    horizontal: 37,
    vertical: 38
}

const TilesType = 
{
    Floor: FloorType,
    Paper: PaperType,
    Wall: WallType
}





class Level extends Phaser.Scene
{
    // n -> number of cells in the horizontal  // m -> number of cells in the vertical
    constructor(n, m, name)
    {
        super({ key: name });

        this.n = n;
        this.m = m;
		this.structureMatrix = new Array(n);
		for (var i = 0; i < this.n; i++)
		{
			this.structureMatrix[i] = new Array(m);
	 	}

        this.tiles;

        // Tiles of fixed 64 * 64 pixels
        this.MapSize = 
        {
            x: this.n * 64,
            y: this.m * 64
        }
    }

    preload() 
    {
        // load the spriteSheet and 
        this.load.spritesheet("World", "../assets/tiles/spritesheet.png", { frameWidth: 64, frameHeight: 64 });
    }

    create() 
    {
        this.InitWorldSprites();

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                // Open the pause menu
                console.log("pauseMenu");
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    update() 
    {

    }

    InitWorld(matrix)
    {
        for (var i = 0; i < this.n; i++)
        {
            for (var j = 0; j < this.m; j++)
            {
                this.structureMatrix[i][j] = matrix[i + j * this.n];
            }
        }
    }

    InitWorldSprites()
    {
        var offset = 
        {
            x: (WINDOW.WIDHT - this.MapSize.x) / 2 + 32,
            y: (WINDOW.HEIGHT - this.MapSize.y) / 2 + 32  
        }

        this.tiles = new Array(this.n);
        for (var i = 0; i < this.n; i++)
        {
            this.tiles[i] = new Array(this.m);
            for (var j = 0; j < this.m; j++)
            {
                this.tiles[i][j] = this.add.image((this.MapSize.x * i)/this.n + offset.x, (this.MapSize.y * j)/this.m + offset.y, "World", this.structureMatrix[i][j]);
            }
        }
    }
}

