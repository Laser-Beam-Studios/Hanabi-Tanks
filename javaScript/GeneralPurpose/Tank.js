class Tank{
    constructor(bulletDamage = 1, bulletBounces = 1, shootingRate = 1, maxHealth = 3, speed = 15, rotSpeed = 15){
        this.bulletDamage = bulletDamage;
        this.bulletBounces = bulletBounces;
        this.shootingRate = shootingRate;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.speed = speed * 10;
        this.rotSpeed = rotSpeed / 10;
        this.sprite = TankSprites.defaultCardBoard;
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