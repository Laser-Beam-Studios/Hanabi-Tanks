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

const BulletSprites = 
{
    default: 0,
    hard: 1,
    sider: 2,
    elastic: 3,
    corkscrew: 4
}

const PowerUps =
{
    goodCardBoard: 3,
    hardCardBoard: 1,
    elasticCardBoard: 0,
    siderCardBoard: 2,
    corkscrewCradBoard: 4
}

const PowerUpsTankSpriteDic = 
{
    3: 0,
    1: 1,
    0: 3,
    2: 4,
    4: 5
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
        this.tankSize = this.sizeOfTile * 4;
        this.tankScale = this.tankSize / 1024;

        // Tiles of fixed 64 * 64 pixels
        this.MapSize = 
        {
            x: this.n * this.sizeOfTile,
            y: this.m * this.sizeOfTile
        }
        // The tiles are images of 64 x 64 pixels
        this.scaleOfTile = this.sizeOfTile / 64;

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
        this.levelsNames = ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6"];
        this.bouncesSounds = ["WallBounce", "WallBounce2"];
    }

    init (data) {
        if (this.name != "Level1")
        {
            this.player1 = data.player1;
            this.player2 = data.player2;
            this.player1.RestartHealth();
            this.player2.RestartHealth();
            this.player1.forward = { x: 1, y: 0 };
            this.player2.forward = { x: -1, y: 0 };
            
            if (this.name == "PowerUp")
            {
                this.nextScene = data.nextLevel;
                let randoms = [];
                let candidate;
                for (var i = 0; i < 3; i++)
                {
                    let found = true;
                    while (found)
                    {
                        found = false;
                        candidate = Math.floor(Math.random() * 4);
                        randoms.forEach(element => {
                            if (element == candidate)
                                found = true
                        });
                    }
                    randoms.push(candidate);
                }
                this.powerUps = { l: randoms[0], m: randoms[1], r: randoms[2] };
            }
            else if (this.name == "Victory")
            {

            }
        }
    }

    preload() 
    {
        // load the spriteSheet and 
        this.load.spritesheet("World", "../assets/TilesSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("Tanks", "../assets/TanksSpriteSheet.png", { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet("Bullets", "../assets/BulletSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("PowerUps", "../assets/PowerUpSpriteSheet.png", { frameWidth: 128, frameHeight: 128 });
        this.load.image("lives_P1", "../assets/UI/Health/health1.png");
        this.load.image("lives_P2", "../assets/UI/Health/health2.png");

        // SFX
        this.load.audio("DestroyBullet", "../assets/Audio/SFX/Bullets/DestroyBullet.mp3");
        this.load.audio("PaperDestroy", "../assets/Audio/SFX/Bullets/PaperDestroy.mp3");
        this.load.audio("PaperHit", "../assets/Audio/SFX/Bullets/PaperHit.mp3");
        this.load.audio("Shoot", "../assets/Audio/SFX/Bullets/Shoot.mp3");
        this.load.audio("TankHit", "../assets/Audio/SFX/Bullets/TankHit.mp3");
        this.load.audio("WallBounce", "../assets/Audio/SFX/Bullets/WallBounce.mp3");
        this.load.audio("WallBounce2", "../assets/Audio/SFX/Bullets/WallBounce2.mp3");
        this.load.audio("VictorySound", "../assets/Audio/SFX/Others/VictorySound.mp3");
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this);
        AudioManager.Instance.PlayOneShoot("VictorySound", "SFX");
        
        this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Part_A"));
        this.musicController.Play();

        this.InitWorldSprites();
        this.InitTankSprites();
        if (this.name == "PowerUp")
            this.InitPowerUps();
        this.InitColliders();

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
        this.input.keyboard.on("keyup", this.OnKeyReleased.bind(this));
        this.events.on('resume', this.CheckMusic.bind(this, this));
    }

    CheckMusic(scene)
    {
        if (!scene.musicController.IsPlaying())
        {
            scene.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
            scene.musicController.SetCallBack("complete", scene.OnMusicPartEnds.bind(scene, "Tanks_Part_A"));
            scene.musicController.Play();
        }
    }

    InitPowerUps()
    {
        let posL = { x: Math.floor(this.n / 2) - 1, y: 2 };
        let posM = { x: Math.floor(this.n / 2), y: 2 };
        let posR = { x: Math.floor(this.n / 2) + 1, y: 2 };
        this.powerUpsGroup = this.physics.add.group();
        let powerUpL = this.add.image(posL.x * this.sizeOfTile + this.offset.x, posL.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.l);
        powerUpL.type = this.powerUps.l;
        Scaler.ScaleToGameW(powerUpL, 0.05);
        this.powerUpsGroup.add(powerUpL);
        let powerUpM = this.add.image(posM.x * this.sizeOfTile + this.offset.x, posM.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.m);
        powerUpM.type = this.powerUps.m;
        Scaler.ScaleToGameW(powerUpM, 0.05);
        this.powerUpsGroup.add(powerUpM);
        let powerUpR = this.add.image(posR.x * this.sizeOfTile + this.offset.x, posR.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.r);
        powerUpR.type = this.powerUps.r;
        Scaler.ScaleToGameW(powerUpR, 0.05);
        this.powerUpsGroup.add(powerUpR);
    }
  
    OnMusicPartEnds(last)
    {
        var lastIdx;
        for (var i = 0; i < this.songsParts.length; i++)
        {
            if(this.songsParts[i] == last) 
            {
                lastIdx = i;
                break;
            }
        }

        var randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        while(randomPartIdx == lastIdx)
        {
            randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        }
        
        this.musicController = AudioManager.Instance.CreateInstance(this.songsParts[randomPartIdx], "Music");
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, this.songsParts[randomPartIdx]));
        this.musicController.Play();
    }

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ESC:
                this.scene.pause(this.name);
                this.scene.launch("Pause", {scene: this.name});
                break;

            case Phaser.Input.Keyboard.KeyCodes.W:
                this.MoveTank(this.player1, true);
                break;

            case Phaser.Input.Keyboard.KeyCodes.S:
                this.MoveTank(this.player1, false);
                break;

            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player1Rotating = true;
                this.player1Rotate = -1;
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
                this.player1Rotating = true;
                this.player1Rotate = 1;
                break;

            case Phaser.Input.Keyboard.KeyCodes.I:
                this.MoveTank(this.player2, true);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.K:
                this.MoveTank(this.player2, false);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.J:
                this.player2Rotating = true;
                this.player2Rotate = -1;
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.L:
                this.player2Rotating = true;
                this.player2Rotate = 1;
                break;

            default:
                break;
        }
    }

    OnKeyReleased(key)
    {
        switch (key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.W:
            case Phaser.Input.Keyboard.KeyCodes.S:
                this.player1.tank.actualSpeed = 0.0;
                break;
                
            case Phaser.Input.Keyboard.KeyCodes.I:
            case Phaser.Input.Keyboard.KeyCodes.K:
                this.player2.tank.actualSpeed = 0.0;
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player1Rotating = false;
                this.player1Rotate = 0;
                break;

            case Phaser.Input.Keyboard.KeyCodes.J:
            case Phaser.Input.Keyboard.KeyCodes.L:
                this.player2Rotating = false;
                this.player2Rotate = 0;
                break;

            case Phaser.Input.Keyboard.KeyCodes.R:
                this.Shoot(this.player1);
                break;

            case Phaser.Input.Keyboard.KeyCodes.P:
                this.Shoot(this.player2);
                break;
        }
    }

    update(time, delta) 
    {
        this.CheckTankRotations();

        this.UpdateTanks();

        if (this.name == "PowerUp")
            if (this.powerUpsGroup.children.size == 1)
            {                
                this.powerUpsGroup.destroy();
                this.scene.stop(this.name);
                this.scene.start(this.nextScene, { player1: this.player1.tank, player2: this.player2.tank, next: this.nextScene });   
            }
    }

    CheckTankRotations()
    {
        if (this.player1Rotating)
        {
            if (this.player1Rotate == -1)
                this.RotateTank(this.player1, true);
            else if (this.player1Rotate == 1)
                this.RotateTank(this.player1, false);
        }
        if (this.player2Rotate)
        {
            if (this.player2Rotate == -1)
                this.RotateTank(this.player2, true);
            else if (this.player2Rotate == 1)
                this.RotateTank(this.player2, false);
        }
    }

    InitWorld(matrix, rightWinningMatrix = null)
    {
        // The player1 and player2 variables store the tank object, from the init to the initTankSprites, but for the order of layers in the sprites for simplicity are reversed
        if (rightWinningMatrix != null && this.player2.score > this.player1.score)
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
        this.levelWalls = this.physics.add.staticGroup();
        this.levelPapers = this.physics.add.staticGroup();
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
                    case TileType.Floor.center:
                    case TileType.Floor.down:
                    case TileType.Floor.downLeft:
                    case TileType.Floor.downRight:
                    case TileType.Floor.left:
                    case TileType.Floor.right:
                    case TileType.Floor.up:
                    case TileType.Floor.upLeft:
                    case TileType.Floor.upRight:
                    case TileType.Paper.h_destroy:
                    case TileType.Paper.v_destroy:
                        break;

                    case TileType.Wall.upLeft:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Wall.upRight:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Wall.vertical:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Wall.horizontal:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Wall.downLeft:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Wall.downRight:                    
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                     
                    case TileType.Border.upLeft:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.up:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.upRight:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.left:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.center:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.right:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.downLeft:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.down:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Border.downRight:
                        this.levelWalls.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;

                    case TileType.Paper.h_perfect:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.h_oneHit:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.h_twoHit:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.h_destroy:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.v_perfect:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.v_oneHit:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.v_twoHit:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                    case TileType.Paper.v_destroy:
                        this.levelPapers.add(this.tiles[i][j]);
                        this.levelObstacles.add(this.tiles[i][j]);
                        break;
                }
                this.tiles[i][j].posMatrix = { x: i, y: j };
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
            case "Level6":
                posX1 = 3 * this.sizeOfTile;
                posX2 = (this.m) * this.sizeOfTile;
                break;

            case "PowerUp":
                posX1 = (Math.floor(this.n / 2) - 2) * this.sizeOfTile;
                posX2 = (Math.floor(this.n / 2) + 2) * this.sizeOfTile;
                posY = (this.m - 2) * this.sizeOfTile;
                break;
        }
        
        this.playersGroup = this.physics.add.group();
        if (this.player1 == null || this.name == "Level1")
        {
            this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", TankSprites.defaultCardBoard);
            this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", TankSprites.defaultCardBoard);
            this.player1.tank = new Tank();
            this.player2.tank = new Tank();
        }
        else
        {
            let p1 = this.player1, p2 = this.player2;
            this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", p1.sprite);
            this.player1.tank = p1;
            this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", p2.sprite);
            this.player2.tank = p2;
            //this.player2.setDepth(this.player2.depth + (this.n * this.m * 2));
            //this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", this.player1Tank.sprite);
            //this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", this.player2Tank.sprite);
        }
        this.player1.setDepth(this.player1.depth + (this.n * this.m * 2))
        this.player2.setDepth(this.player2.depth + (this.n * this.m * 2))
        this.player1.scale = this.tankScale;
        this.player2.scale = this.tankScale;
        this.playersGroup.add(this.player1);
        this.playersGroup.add(this.player2);
        this.player2.rotation = Math.PI;
        this.player2.tank.forward.x = -1;
    }

    InitColliders()
    {
        this.bulletsGroup = this.physics.add.group();
        this.siderBulletsGroup = this.physics.add.group();
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.playersGroup, this.levelObstacles);
        this.physics.add.collider(this.playersGroup, this.bulletsGroup, (player, bullet) => 
        {
            this.TakeDamage(player, bullet);
            this.DestroyBullet(bullet, this.BounceBullet(bullet, player));
        });
        this.physics.add.collider(this.siderBulletsGroup, this.playersGroup, (bullet, player) =>
        {
            this.TakeDamage(player, bullet);
            this.DestroyBullet(bullet, this.BounceBullet(bullet, player));
        })
        this.physics.add.collider(this.siderBulletsGroup, this.levelWalls, (bullet, obstacle) =>
            {
                this.DestroyBullet(bullet, this.BounceBullet(bullet, obstacle));
            })
        this.physics.add.collider(this.bulletsGroup, this.levelWalls, (bullet, obstacle) =>
        {     
            this.DestroyBullet(bullet, this.BounceBullet(bullet, obstacle));
        })
        this.physics.add.collider(this.bulletsGroup, this.levelPapers, (bullet, obstacle) =>
            {     
                this.DamageLevel(bullet, obstacle);
                this.DestroyBullet(bullet, true);
            })
        if (this.name == "PowerUp")
        {
            this.physics.add.collider(this.powerUpsGroup, this.levelObstacles);
            this.powerUpsGroup.getChildren().forEach(element1 =>
            {
                this.powerUpsGroup.getChildren().forEach(element2 =>
                {
                    this.physics.add.collider(element1, element2);
                });
            });
            this.physics.add.collider(this.playersGroup, this.powerUpsGroup, (player, powerUp) =>
            {
                if (player.tank.canRecivePowerUp)
                {
                    let found;
                    switch (powerUp.type)
                    {
                        case PowerUps.corkscrewCradBoard:
                            found = false;
                            player.tank.powerUps.forEach(element =>
                            {
                                if (element == PowerUps.siderCardBoard)
                                    found = true;
                            });

                            if (found)
                                return;

                            player.tank.shootingRate += 60;
                            break;

                        case PowerUps.elasticCardBoard:
                            player.tank.bulletBounces++;
                            if (player.tank.shootingRate - 30 < 30)
                                player.tank.shootingRate -= 30;
                            break;

                        case PowerUps.goodCardBoard:
                            player.tank.maxHealth++;
                            break;

                        case PowerUps.hardCardBoard:found = false;
                            player.tank.powerUps.forEach(element =>
                            {
                                if (element == PowerUps.elasticCardBoard)
                                    found = true;
                            });

                            if (found)
                                return;

                            player.tank.bulletDamage++;
                            break;

                        case PowerUps.siderCardBoard:
                            found = false;
                            player.tank.powerUps.forEach(element =>
                            {
                                if (element == PowerUps.siderCardBoard)
                                    found = true;
                            });

                            if (found)
                                return;

                            player.tank.bulletSpeed += 500;
                            break;
                    }
                    player.tank.powerUps.push(powerUp.type);
                    player.tank.canRecivePowerUp = false;
                    player.tank.sprite = PowerUpsTankSpriteDic[powerUp.type];
                    powerUp.destroy();
                }
            })
        }
    }

    UpdateTanks()
    {
        this.player1.setVelocityX(this.player1.tank.forward.x * this.player1.tank.speed * this.player1.tank.actualSpeed);                
        this.player1.setVelocityY(this.player1.tank.forward.y * this.player1.tank.speed * this.player1.tank.actualSpeed);

        this.player2.setVelocityX(this.player2.tank.forward.x * this.player2.tank.speed * this.player2.tank.actualSpeed);                
        this.player2.setVelocityY(this.player2.tank.forward.y * this.player2.tank.speed * this.player2.tank.actualSpeed);
    }

    MoveTank(player, forward)
    {
        let modifier;
        if (forward) modifier = 1;
        else modifier = -1;

        player.tank.actualSpeed = modifier;
    }

    RotateTank(player, left)
    {
        let modifier;
        if (left)
            modifier = -1;
        else
            modifier = 1;

        player.angle += this.player2.tank.rotSpeed * modifier;
        player.tank.Rotate(player.rotation);
    }

    Shoot(player)
    {
        if (this.name == "PowerUp")
            return;
        if (player.tank.canShoot)
        {
            player.tank.canShoot = false;
            let bullet = this.physics.add.sprite(player.x + player.tank.forward.x * this.sizeOfTile, player.y + player.tank.forward.y * this.sizeOfTile, "Bullets", player.tank.bulletType);
            bullet.scale = 1 / 10;
            bullet.shooter = player.tank;
            this.time.addEvent({
                delay: 1000,
                callback: player => {
                    player.tank.inmune = false;
                },
                callbackScope: this,
                args: [player]
            });
            player.tank.inmune = true;
            this.time.addEvent({
                delay: player.tank.shootingRate * 1000,
                callback: player => {
                    player.tank.canShoot = true;
                },
                callbackScope: this,
                args: [player]
            });
            let sider = false;
            player.tank.powerUps.forEach(element =>
            {
                if (element == PowerUps.siderCardBoard)
                    sider = true;
            });

            if (sider)
                this.siderBulletsGroup.add(bullet);
            else
                this.bulletsGroup.add(bullet);

            bullet.velocity = { x: player.tank.bulletSpeed * player.tank.forward.x, y: player.tank.bulletSpeed * player.tank.forward.y };
            bullet.setVelocityX(bullet.velocity.x);
            bullet.setVelocityY(bullet.velocity.y);
            bullet.bouncesLeft = player.tank.bulletBounces;
            bullet.damage = player.tank.bulletDamage;

            // ShootAudio
            AudioManager.Instance.PlayOneShoot("Shoot", "SFX");
        }
    }

    TakeDamage(player, bullet)
    {
        bullet.bouncesLeft = 0;
        if (bullet.shooter == player && player.tank.inmune)
            return;

        AudioManager.Instance.PlayOneShoot("TankHit", "SFX");

        if (player.tank.health == 1)
        {
            if (this.player1 == player) this.player2.tank.score++;
            else this.player1.tank.score++;

            var nextLevel = this.GetNextLevel();
            this.scene.stop(this.name);
            if(nextLevel == "Victory")
            {
                this.scene.start("Victory", { player1: this.player1.tank, player2: this.player2.tank, nextLevel: nextLevel});
            }
            else
            {
                this.scene.start("PowerUp", { player1: this.player1.tank, player2: this.player2.tank, nextLevel: nextLevel});
            }       
        }

        player.tank.health--;
    }

    GetNextLevel()
    {
        var scoreDiference = this.player1.tank.score - this.player2.tank.score; 
        switch(this.name)
        {
            case "Level1": // If i'm in level 0 i just can go to the level 2
                return  "Level2";
            case "Level2":  // if i'm in level 2 i can go to the level 4 or level 3
                if (Math.abs(scoreDiference) == 0) return "Level3"
                else return "Level4";
            case "Level3":  // I can just go to level 5
                return "Level5";
            case "Level4":  // I can finish with one winner or go to level 5
                if (Math.abs(scoreDiference) == 1) return "Level5";
                else return "Victory";
            case "Level5":  // I can just go to win screen or to level 6
                if (Math.abs(scoreDiference) == 0) return "Level6";
                else return "Victory";
            case "Level6":  // i can just go to win screen
                return "Victory";
            default:
                console.log("ERROR_IN_GETNEXTLEVEL_UNKOWN_LEVELNAME: " + this.name);
                return;
        }
    }

    DamageLevel(bullet, obstacle)
    {
        let posX = obstacle.posMatrix.x, posY = obstacle.posMatrix.y, newTile, collider = true;
        switch(this.structureMatrix[posX][posY])
        {
            case PaperType.h_oneHit:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.h_destroy;
                    collider = false;
                    AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                }
                else{
                    newTile = PaperType.h_twoHit;
                    this.structureMatrix[posX][posY] = newTile;
                    AudioManager.Instance.PlayOneShoot("PaperHit", "SFX");
                }
                bullet.bouncesLeft = 0;
                break;

            case PaperType.h_perfect:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.h_destroy;
                    collider = false;
                    AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                }
                else{
                    newTile = PaperType.h_oneHit;
                    this.structureMatrix[posX][posY] = newTile;
                    AudioManager.Instance.PlayOneShoot("PaperHit", "SFX");
                }
                bullet.bouncesLeft = 0;    
                break;

            case PaperType.h_twoHit:
                newTile = PaperType.h_destroy;
                collider = false;
                AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                bullet.bouncesLeft = 0;
                break;

            case PaperType.v_oneHit:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.v_destroy;
                    collider = false;
                    AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                }
                else{
                    newTile = PaperType.v_twoHit;
                    this.structureMatrix[posX][posY] = newTile;
                    AudioManager.Instance.PlayOneShoot("PaperHit", "SFX");
                }
                    bullet.bouncesLeft = 0;
                break;

            case PaperType.v_perfect:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.v_destroy;
                    collider = false;
                    AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                }
                else{
                    newTile = PaperType.v_oneHit;
                    this.structureMatrix[posX][posY] = newTile;
                    AudioManager.Instance.PlayOneShoot("PaperHit", "SFX");
                }
                    bullet.bouncesLeft = 0;
                break;

            case PaperType.v_twoHit:
                newTile = PaperType.v_destroy;
                collider = false;
                AudioManager.Instance.PlayOneShoot("PaperDestroy", "SFX");
                bullet.bouncesLeft = 0;
                break;

            default:
                return;                
        }

        this.tiles[posX][posY].destroy();
        let newObstacle = this.add.image((this.MapSize.x * posX)/this.n + this.offset.x, (this.MapSize.y * posY)/this.m + this.offset.y, "World", newTile);
        newObstacle.posMatrix = { x: posX, y: posY };
        this.tiles[posX][posY] = newObstacle;
        if (collider){
            this.levelObstacles.add(this.tiles[posX][posY]);
            this.levelPapers.add(this.tiles[posX][posY]);
            this.physics.add.existing(this.tiles[posX][posY], true);
            
        }        
    }

    BounceBullet(bullet, obstacle)
    {
        let velocityX = bullet.velocity.x;
        let velocityY = bullet.velocity.y;

        const normalX = bullet.x - obstacle.x;
        const normalY = bullet.y - obstacle.y;
        let horizontal
        if (Math.abs(normalX) > Math.abs(normalY))
            horizontal = false;
        else if (Math.abs(normalY) > Math.abs(normalX))
            horizontal = true;
        else
            return false;
        
        if (horizontal)
            velocityY *= -1;
        else
            velocityX *= -1;

        bullet.velocity.x = velocityX;
        bullet.velocity.y = velocityY;
        bullet.body.setVelocity(velocityX, velocityY);
        return true;
    }

    DestroyBullet(bullet, bounced)
    {
        if (!bounced)
            return;

        if (bullet.bouncesLeft == 0)
        {
            // Destroy Bullet Audio
            AudioManager.Instance.PlayOneShoot("DestroyBullet", "SFX");
            bullet.destroy();
            return;
        }
        bullet.bouncesLeft--;

        // Bounce Audio
        var randomBounceSoundIdx = Math.floor(Math.random() * this.bouncesSounds.length); 
        console.log("IDX: " + randomBounceSoundIdx + ", Name: " + this.bouncesSounds[randomBounceSoundIdx]);
        AudioManager.Instance.PlayOneShoot(this.bouncesSounds[randomBounceSoundIdx], "SFX");
    }
}
