const FloorType =
{
    upLeft: 0,
    up: 1,
    upRight: 2,
    left: 8,
    center: 9,
    right: 10,
    downLeft: 16,
    down: 17,
    downRight: 18
}

const PaperType =
{
    v_perfect: 5,
    v_twoHit: 6,
    h_twoHit: 7,
    v_oneHit: 13,
    v_destroy: 14,
    h_destroy: 15,
    h_perfect: 21, 
    h_oneHit: 22
}

const WallType =
{
    upLeft: 3,
    upRight: 4,
    vertical: 11,
    horizontal: 12,
    downLeft: 19,
    downRight: 20
}

const BorderType =
{
    upLeft: 23,
    up: 24,
    upRight: 25,
    left: 26,
    center: 27,
    right: 28,
    downLeft: 29,
    down: 30,
    downRight: 31
}

const TileType = 
{
    Floor: FloorType,
    Paper: PaperType,
    Wall: WallType,
    Border: BorderType
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
    "_": TileType.Floor.down,
    "┘": TileType.Floor.downRight,
    // Wall
    "╔": TileType.Wall.upLeft,
    "╗": TileType.Wall.upRight,
    "║": TileType.Wall.vertical,
    "═": TileType.Wall.horizontal,
    "╚": TileType.Wall.downLeft,
    "╝": TileType.Wall.downRight,
    // Paper
        // Horizontal
    "▬": TileType.Paper.h_perfect,
    "─": TileType.Paper.h_oneHit,
    "-": TileType.Paper.h_twoHit,
    "h": TileType.Paper.h_destroy,
        // Vertical
    "│": TileType.Paper.v_perfect,
    "¦": TileType.Paper.v_oneHit,
    "┼": TileType.Paper.v_twoHit,
    "v": TileType.Paper.v_destroy,
    // Border
    "◄": TileType.Border.upLeft,
    "▲": TileType.Border.up,
    "►": TileType.Border.upRight,
    "{": TileType.Border.left,
    "b": TileType.Border.center,
    "}": TileType.Border.right,
    "«": TileType.Border.downLeft,
    "▼": TileType.Border.down,
    "»": TileType.Border.downRight
}

const TankSprites = 
{
    goodCardBoard: 0,
    hardCardBoard: 1,
    defaultCardBoard: 2,
    elasticCardBoard: 3,
    siderCardBoard: 4,
    corkscrewCradBoard: 5
}

const TankPowerUpsSprites = 
{

}

class Level extends Phaser.Scene
{
    // n -> number of cells in the horizontal  // m -> number of cells in the vertical
    constructor(n, m, sizeOfTile, name)
    {
        super({ key: name });
        this.name = name;

        this.n = n;
        this.m = m;
		this.structureMatrix = new Array(n);
		for (var i = 0; i < this.n; i++)
		{
			this.structureMatrix[i] = new Array(m);
	 	}

        this.tiles;
        this.sizeOfTile = sizeOfTile;
        this.tankSize = 256;
        this.tankScale = this.tankSize / 1024;

        // Tiles of fixed 64 * 64 pixels
        this.MapSize = 
        {
            x: this.n * this.sizeOfTile,
            y: this.m * this.sizeOfTile
        }
        // The tiles are images of 64 x 64 pixels
        this.scaleOfTile = this.sizeOfTile / 64;
    }

    init (data) {
        if (this.name == "Level1")
        {
            this.player1Tank = null;
            this.player2Tank = null;
            this.player1Score = 0;
            this.player2Score = 0;
        }
        else
        {
            this.player1Tank = data.player1Tank;
            this.player2Tank = data.player2Tank;
            this.player1Score = data.player1Score;
            this.player2Score = data.player2Score;
            this.player1Tank.RestartHealth();
            this.player2Tank.RestartHealth();
        }
    }

    preload() 
    {
        // load the spriteSheet and 
        this.load.spritesheet("World", "../assets/TilesSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("Tanks", "../assets/TanksSpriteSheet.png", { frameWidth: 256, frameHeight: 256 });
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this);

        this.InitWorldSprites();
        this.InitTankSprites();
        this.InitColliders();

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
        this.input.keyboard.on("keyup", this.OnKeyReleased.bind(this));
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                // Open the pause menu
                console.log("pauseMenu");
                break;

            case Phaser.Input.Keyboard.KeyCodes.W:
                this.MoveTank(true, true);
                break;

            case Phaser.Input.Keyboard.KeyCodes.S:
                this.MoveTank(true, false);
                break;

            case Phaser.Input.Keyboard.KeyCodes.A:
                this.RotateTank(true, true);
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
                this.RotateTank(true, false);
                break;

            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.MoveTank(false, true);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.MoveTank(false, false);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.RotateTank(false, true);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.RotateTank(false, false);    
                break;

            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    OnKeyReleased(key)
    {
        switch (key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.W:
            case Phaser.Input.Keyboard.KeyCodes.S:
                this.player1.setVelocity(0);
                break;
                
            case Phaser.Input.Keyboard.KeyCodes.UP:
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.player2.setVelocity(0);
        }
    }

    update() 
    {

    }

    InitWorld(matrix, rightWinningMatrix = null)
    {
        if (rightWinningMatrix != null && this.player2Score > this.player1Score)
        {
            matrix = rightWinningMatrix.map((x) => TilesDictionary[x]);
        }
        else
        {
            matrix = matrix.map((x) => TilesDictionary[x]);            
        }
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
        this.levelObstacles = this.physics.add.staticGroup();
        this.offset = 
        {
            x: (WINDOW.WIDHT - this.MapSize.x) / 2 + this.sizeOfTile/2,
            y: (WINDOW.HEIGHT - this.MapSize.y) / 2 + this.sizeOfTile/2  
        }

        this.tiles = new Array(this.n);
        for (var i = 0; i < this.n; i++)
        {
            this.tiles[i] = new Array(this.m);
            for (var j = 0; j < this.m; j++)
            {
                this.tiles[i][j] = this.add.image((this.MapSize.x * i)/this.n + this.offset.x, (this.MapSize.y * j)/this.m + this.offset.y, "World", this.structureMatrix[i][j]);
                switch (this.structureMatrix[i][j])
                {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                    case 16:
                    case 17:
                    case 18:
                        break;

                    default:                            
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                }
                this.tiles[i][j].scale = this.scaleOfTile;
            }
        }
    }

    InitTankSprites()
    {        
        let posX1, posX2;
        let posY = ((this.m / 2) - 0.5) * this.sizeOfTile;
        switch (this.name)
        {
            case "Level1":
            case "Level2":
            case "Level3":
            case "Level4":
            case "Level5":
                posX1 = 2 * this.sizeOfTile;
                posX2 = (this.m + 1) * this.sizeOfTile;
                break;

            case "PowerUp":
                posY = (this.m - 1) * this.sizeOfTile;
                break;
        }
        if (this.player1Tank == null)
        {
            this.player1Tank = new Tank();
            this.player2Tank = new Tank();
        }
        this.playersGroup = this.physics.add.group();
        this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", this.player1Tank.sprite);
        this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", this.player2Tank.sprite);
        this.player1.scale = this.tankScale;
        this.player2.scale = this.tankScale;
        this.playersGroup.add(this.player1);
        this.playersGroup.add(this.player2);
        this.player2.rotation = Math.PI;
        this.player2Tank.forward.x = -1;
    }

    InitColliders()
    {
        this.physics.add.collider(this.playersGroup, this.levelObstacles);
    }

    MoveTank(player1, forward)
    {
        let modifier;
        if (forward)
            modifier = 1;
        else
            modifier = -1;

        if (player1)
        {
            this.player1.setVelocityX(this.player1Tank.forward.x * this.player1Tank.speed * modifier);                
            this.player1.setVelocityY(this.player1Tank.forward.y * this.player1Tank.speed * modifier);
        }
        else
        {
            
            this.player2.setVelocityX(this.player2Tank.forward.x * this.player2Tank.speed * modifier);                
            this.player2.setVelocityY(this.player2Tank.forward.y * this.player2Tank.speed * modifier);
        }
    }

    RotateTank(player1, left)
    {
        let modifier;
        if (left)
            modifier = -1;
        else
            modifier = 1;

        if (player1)
        {
            this.player1.angle += this.player1Tank.rotSpeed * modifier;
            this.player1Tank.Rotate(this.player1.rotation);
        }
        else
        {
            this.player2.angle += this.player2Tank.rotSpeed * modifier;
            this.player2Tank.Rotate(this.player2.rotation);
        }
    }
}

