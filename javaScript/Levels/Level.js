const FloorType =
{
    upLeft: 0,
    up: 1,
    upRight: 2,
    left: 7,
    center: 8,
    right: 9,
    downLeft: 14,
    down: 15,
    downRight: 16
}

const PaperType =
{
    perfect: 5,
    destroy: 6,
    oneHit: 12,
    twoHit: 19
}

const WallType =
{
    upLeft: 3,
    upRight: 4,
    vertical: 10,
    horizontal: 11,
    downLeft: 17,
    downRight: 18
}

const TileType = 
{
    Floor: FloorType,
    Paper: PaperType,
    Wall: WallType
}

const TilesDictionary =
{
    // Floor
    "┌": TileType.Floor.upLeft,
    "¯": TileType.Floor.up,
    "┐": TileType.Floor.upRight,
    "[": TileType.Floor.left,
    " ": TileType.Floor.center,
    "]": TileType.Floor.right,
    "└": TileType.Floor.downLeft,
    "_": TileType.Floor.downRight,
    // Wall
    "╔": TileType.Wall.upLeft,
    "╗": TileType.Wall.upRight,
    "║": TileType.Wall.vertical,
    "═": TileType.Wall.horizontal,
    "╚": TileType.Wall.downLeft,
    "╝": TileType.Wall.downRight,
    // Paper
    

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
        this.load.spritesheet("World", "../assets/TilesSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
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

