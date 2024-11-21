class Tank{
    constructor(bulletDamage = 1, bulletBounces = 1, bulletSpeed = 100, shootingRate = 120, maxHealth = 3, speed = 15, rotSpeed = 15){
        this.bulletDamage = bulletDamage;
        this.bulletBounces = bulletBounces;
        this.bulletSpeed = bulletSpeed;
        this.shootingRate = 60 / shootingRate;
        this.canShoot = true;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.speed = speed * 10;
        this.rotSpeed = rotSpeed / 10;
        this.sprite = TankSprites.defaultCardBoard;
        this.bulletType = BulletSprites.default;
        this.powerUps = [];

        this.forward =
        {
            x: 1,
            y: 0
        }
    }

    RestartHealth()
    {
        this.health = this.maxHealth;
    }

    Rotate(rotation)
    {
        this.forward.x = Math.cos(rotation);
        this.forward.y = Math.sin(rotation);
    }
}