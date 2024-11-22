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

        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
    }

    init (data) {
        if (this.name == "PowerUp")
        {
            this.nextScene = "Level" + data.next;
            randoms = [];
            candidate
            for (var i = 0; i < 3; i++)
            {
                found = true;
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
        else if (this.name != "Level1")
        {
            this.player1 = data.player1;
            this.player2 = data.player2;
            this.player1.tank.RestartHealth();
            this.player2.tank.RestartHealth();
        }
    }

    preload() 
    {
        // load the spriteSheet and 
        this.load.spritesheet("World", "../assets/TilesSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("Tanks", "../assets/TanksSpriteSheet.png", { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet("Bullets", "../assets/BulletSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("PowerUps", "../assets/PowerUpSpriteSheet.png", { frameWidth: 64, frameHeight: 64 });
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this);

        var controller = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music", "complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));
        controller.Play();

        this.InitWorldSprites();
        this.InitTankSprites();
        if (this.name == "PowerUp")
            this.InitPowerUps();
        this.InitColliders();

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));
        this.input.keyboard.on("keyup", this.OnKeyReleased.bind(this));
    }

    InitPowerUps()
    {
        posL = { x: Math.ceil(this.n / 2) - 1, y: 2 };
        posM = { x: Math.ceil(this.n / 2), y: 2 };
        posR = { x: Math.ceil(this.n / 2) + 1, y: 2 };
        this.powerUpsGroup = this.physics.add.group();
        powerUpL = this.add.image(posL.x * this.sizeOfTile + this.offset.x, posL.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.l);
        powerUpL.type = this.powerUps.l;
        this.powerUpsGroup.add(powerUpL);
        powerUpM = this.add.image(posM.x * this.sizeOfTile + this.offset.x, posM.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.m);
        powerUpM.type = this.powerUps.m;
        this.powerUpsGroup.add(powerUpM);
        powerUpR = this.add.image(posR.x * this.sizeOfTile + this.offset.x, posR.y * this.sizeOfTile + this.offset.y, "PowerUps", this.powerUps.r);
        powerUpR.type = this.powerUps.r;
        this.powerUpsGroup.add(powerUpR);
    }
  
    OnMusicPartEnds(last)
    {
        console.log("Music ends " + last);

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
            console.log("SAME ID THAT LAST PART: " + this.songsParts[randomPartIdx]);
            randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        }
        
        var controller = AudioManager.Instance.CreateInstance(this.songsParts[randomPartIdx], "Music", "complete", this.OnMusicPartEnds.bind(this, this.songsParts[randomPartIdx]));
        controller.Play();
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
                this.player1Rotating = true;
                this.player1Rotate = -1;
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
                this.player1Rotating = true;
                this.player1Rotate = 1;
                break;

            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.MoveTank(false, true);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.MoveTank(false, false);
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player2Rotating = true;
                this.player2Rotate = -1;
                break;
    
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player2Rotating = true;
                this.player2Rotate = 1;
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
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player1Rotating = false;
                this.player1Rotate = 0;
                break;

            case Phaser.Input.Keyboard.KeyCodes.LEFT:
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player2Rotating = false;
                this.player2Rotate = 0;
                break;

            case Phaser.Input.Keyboard.KeyCodes.SPACE:
                this.Shoot(this.player1);
                break;

            case Phaser.Input.Keyboard.KeyCodes.ENTER:
                this.Shoot(this.player2);
                break;
        }
    }

    update(time, delta) 
    {
        this.CheckTankRotations();

        if (this.name == "PowerUp")
            if (this.powerUpsGroup.childer.size == 1)
            {                
                this.scene.stop(this.name);
                this.scene.start(this.nextScene, { player1: this.player1, player2: this.player2, next: "" });   
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

                    default:                            
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

            case "PowerUp":
                posY = (this.m - 1) * this.sizeOfTile;
                break;
        }
        
        this.playersGroup = this.physics.add.group();
        if (this.player1 == null)
        {
            this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", TankSprites.defaultCardBoard);
            this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", TankSprites.defaultCardBoard);
            this.player1.score = 3;
            this.player2.score = 3;
            this.player1.tank = new Tank();
            this.player2.tank = new Tank();
        }
        else
        {
            this.player1.x = posX1 + this.offset.x;
            this.player1.y = posY + this.offset.y;
            this.player2.x = posX2 + this.offset.x
            this.player2.y = posY + this.offset.y;
            //this.player1 = this.physics.add.sprite(posX1 + this.offset.x, posY + this.offset.y, "Tanks", this.player1Tank.sprite);
            //this.player2 = this.physics.add.sprite(posX2 + this.offset.x, posY + this.offset.y, "Tanks", this.player2Tank.sprite);
        }
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
        this.physics.add.collider(this.bulletsGroup, this.levelObstacles, (bullet, obstacle) =>
        {   
            console.log(bullet.body.velocity);         
            this.DamageLevel(bullet, obstacle);
            this.DestroyBullet(bullet, this.BounceBullet(bullet, obstacle));
        })
        if (this.name == "PowerUp")
        {
            this.physics.add.collider(this.playersGroup, this.powerUpsGroup, (player, powerUp) =>
            {
                if (player.tank.canRecivePowerUp)
                {
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
                    powerUp.destroy();
                }
            })
        }
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
            this.player1.setVelocityX(this.player1.tank.forward.x * this.player1.tank.speed * modifier);                
            this.player1.setVelocityY(this.player1.tank.forward.y * this.player1.tank.speed * modifier);
        }
        else
        {
            
            this.player2.setVelocityX(this.player2.tank.forward.x * this.player2.tank.speed * modifier);                
            this.player2.setVelocityY(this.player2.tank.forward.y * this.player2.tank.speed * modifier);
        }
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
            bullet.shooter = player;
            this.time.addEvent({
                delay: 1000,
                callback: player => {
                    player.inmune = false;
                },
                callbackScope: this,
                args: [player]
            });
            player.inmune = true;
            this.time.addEvent({
                delay: player.tank.shootingRate * 1000,
                callback: player => {
                    player.tank.canShoot = true;
                },
                callbackScope: this,
                args: [player]
            });
            sider = false;
            player.powerUps.forEach(element =>
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
        }
    }

    TakeDamage(player, bullet)
    {
        if (bullet.shooter == player && bullet.inmuneTime > 0)
            return;

        if (player.tank.health == 1)
        {
            player.score--;
            this.scene.stop(this.name);
            this.scene.start("PowerUp", { player1: this.player1, player2: this.player2, next: this.name[this.name.lenght - 1] + 1});
            return;
        }

        player.tank.health--;
    }

    DamageLevel(bullet, obstacle)
    {
        let posX = obstacle.posMatrix.x, posY = obstacle.posMatrix.y, newTile, collider = true;
        //console.log(this.structureMatrix[obstacle.posMatrix.x][obstacle.posMatrix.y]);
        switch(this.structureMatrix[posX][posY])
        {
            case PaperType.h_oneHit:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.h_destroy;
                    collider = false;
                }
                else
                    newTile = PaperType.h_twoHit;
                break;

            case PaperType.h_perfect:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.h_destroy;
                    collider = false;
                }
                else
                    newTile = PaperType.h_oneHit;
                break;

            case PaperType.h_twoHit:
                newTile = PaperType.h_destroy;
                collider = false;
                break;

            case PaperType.v_oneHit:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.v_destroy;
                    collider = false;
                }
                else
                    newTile = PaperType.v_twoHit;
                break;

            case PaperType.v_perfect:
                if (bullet.damage > 1)
                {
                    newTile = PaperType.v_destroy;
                    collider = false;
                }
                else
                    newTile = PaperType.h_oneHit;
                break;

            case PaperType.v_twoHit:
                newTile = PaperType.v_destroy;
                collider = false;
                break;

            default:
                return;                
        }

        this.tiles[posX][posY].destroy();
        this.tiles[posX][posY] = this.add.image((this.MapSize.x * posX)/this.n + this.offset.x, (this.MapSize.y * posY)/this.m + this.offset.y, "World", newTile);
        if (collider)
            this.levelObstacles.add(this.tiles[posX][posY]);
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
            bullet.destroy();
            return;
        }
        bullet.bouncesLeft--;
    }
}

