class IntroGame extends Phaser.Scene {
    constructor() {
        super({ key: "IntroScene" });
    }

    preload() {
		this.load.audio("select", '../assets/select.mp3');
        this.load.audio("background", '../assets/8bit-music.mp3');
        
        this.load.image("start_button", "../assets/start-button.svg");
        this.load.image("help_button", "../assets/help-button.svg");
        this.load.image("config_button", "../assets/config-button.svg");
    }

    create() {
        const hello_text = this.add.text(150, 50, 'Welcome to the Pong Game!', { fill: '#0f0', fontSize: 38 });
        this.bgMusic = this.sound.add('background');
        this.bgMusic.loop = true;
        this.bgMusic.play();

        const start_button = this.add.image(400, 300, "start_button")
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play("select");
                this.scene.stop("IntroScene");
                this.scene.start("GameScene");
        });
        const config_button = this.add.image(400, 375, "config_button");
        const help_button = this.add.image(400, 450, "help_button");
        

        this.events.on('shutdown', () => {
            this.bgMusic.stop();
        });
        
    }

    update() {}

}