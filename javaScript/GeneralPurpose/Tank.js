class Tank{
    constructor(spawnRight, bulletDamage = 1, bulletBounces = 1, shootingRate = 1, maxHealth = 3, speed = 15, rotSpeed = 15, powerUp = null){
        this.bulletDamage = bulletDamage;
        this.bulletBounces = bulletBounces;
        this.shootingRate = shootingRate;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.speed = speed;
        this.rotSpeed = rotSpeed;
        this.sprite = "default";

        let x = 0;
        if (spawnRight){
            x = 1;
        }
        else{
            x = -1;
        }

        this.forward = {
            x: x,
            y: 0
        }

        if (powerUp != null){
            powerUp(this);
        }
    }
}