class Play extends Phaser.Scene{
    constructor() { 
        super("playScene");
        console.log("is the play scene being created???")
    }
    preload(){
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
    }
    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);
        this.ship1 = new Ship(this, 100, 200, 'spaceship').setOrigin(0.5, 1);
        this.ship2 = new Ship(this, 300, 240, 'spaceship').setOrigin(0.5, 1);
        this.ship3 = new Ship(this, 380, 300, 'spaceship').setOrigin(0.5, 1);
        //green UI background rectangle
        this.add.rectangle(0, borderUISize + borderPadding,
             game.config.width, borderUISize * 2, 
             0x00FF00, ).setOrigin(0,0);
        
             //white borders
             this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
             this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
             this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
             this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

             keyF= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
             keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
             keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
             keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


                
         
    }
    update(){
        this.starfield.x -=4;
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

    }
}