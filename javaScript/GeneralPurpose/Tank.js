class Tank{
    constructor(bulletDamage = 1, bulletBounces = 1, bulletSpeed = 1000, shootingRate = 120, maxHealth = 3, speed = 150, rotSpeed = 1.5){
        this.bulletDamage = bulletDamage;
        this.bulletBounces = bulletBounces;
        this.bulletSpeed = bulletSpeed;
        this.shootingRate = 60 / shootingRate;
        this.canShoot = true;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.speed = speed;
        this.actualSpeed = 0.0;
        this.rotSpeed = rotSpeed;
        this.sprite = TankSprites.defaultCardBoard;
        this.bulletType = BulletSprites.default;
        this.powerUps = [];
        this.canRecivePowerUp = true;
        this.score = 3;
        this.inmune = true;

        this.forward =
        {
            x: 1,
            y: 0
        }
    }

    RestartHealth()
    {
        this.health = this.maxHealth;
        this.canRecivePowerUp = true;
        this.canShoot = true;
    }

    Rotate(rotation)
    {
        this.forward.x = Math.cos(rotation);
        this.forward.y = Math.sin(rotation);
    }
}