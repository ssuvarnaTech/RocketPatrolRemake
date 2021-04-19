class Play extends Phaser.Scene{
    constructor() { 
        super("playScene");
        console.log("is the play scene being created???")
    }
    preload(){
        this.load.image('border', 'assets/border.png')
        this.load.image('lair', 'assets/lair2.png');
        this.load.image('ariel', 'assets/ariel.png');
        this.load.image('ursula', 'assets/ursula.png');
        this.load.image('trident', 'assets/trident2.png')
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9})
    }
    create(){
        this.lair = this.add.tileSprite(0, 0, 640, 480, 'lair').setOrigin(0, 0);
        console.log('areil created');
        this.ariel = new Ariel(this, game.config.width/2, 431, 'ariel').setOrigin(0.5, 1);
        this.ursula1 = new Ursula(this, 100, 200, 'ursula',0,  10).setOrigin(0.5, 1);
        this.ursula2 = new Ursula(this, 300, 240, 'ursula', 0,  10).setOrigin(0.5, 1);
        this.ursula3 = new Ursula(this, 380, 300, 'ursula', 0, 10).setOrigin(0.5, 1);
        this.trident = new Trident(this, 150, 200, 'trident' , 0, 100).setOrigin(0.5, 1);
        //green UI background rectangle
        this.add.rectangle(0, borderUISize + borderPadding,
             game.config.width, borderUISize * 2, 
             0x00FF00).setOrigin(0,0);
        
            //  //white borders
            //  this.add.rectangle(0, 0, game.config.width, borderUISize,0x000000).setOrigin(0 ,0);
            //  this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
            //  this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
            //  this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

             //design borders
             this. b = this.add.image(game.config.width,borderUISize , 'border').setOrigin(0,0);
             this.add.image(game.config.height - borderUISize, game.config.width, borderUISize, 'border').setOrigin(0,0);
             this.add.image( borderUISize, game.config.height, 'border').setOrigin(0 ,0);
             this.add.image( game.config.width - borderUISize, 0, borderUISize, game.config.height, 'border').setOrigin(0 ,0);
   

             keyF= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
             keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
             keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
             keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
             // animation config
                this.anims.create({
                 key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
                frameRate: 30
                });
                this.p1Score = 0;
                // display score
                let scoreConfig = {
                    fontFamily: 'Courier',
                    fontSize: '28px',
                    backgroundColor: '#F3B141',
                    color: '#843605',
                    align: 'right',
                    padding: {
                    top: 5,
                    bottom: 5,
                    },
                    fixedWidth: 100
                     }
                this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
                
                this.gameOver = false;
                scoreConfig.fixedWidth = 0;
                this.clock = this.time.delayedCall(60000, () => {
                    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
                    this.gameOver = true;
                }, null, this);
        }
     update(){
          // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
    this.scene.restart();
    }
        this.lair.tilePositionX -=4;
        if (!this.gameOver) {               
            this.ariel.update();         // update rocket sprite
            this.ursula1.update();           // update spaceships (x3)
            this.ursula2.update();
            this.ursula3.update();
            this.trident.update();
        } 

        if(this.checkCollision(this.ariel, this.ursula3)) {
            this.ariel.reset();
            this.ursulaExplode(this.ursula3);   
          }
          if (this.checkCollision(this.ariel, this.ursula2)) {
            this.ariel.reset();
            this.ursulaExplode(this.ursula2);
          }
          if (this.checkCollision(this.ariel, this.ursula1)) {
            this.ariel.reset();
            this.ursulaExplode(this.ursula1);
          }
          if(this.checkCollision(this.ariel, this.trident)){
              this.ariel.reset();
              this.ursulaExplode(this.trident);
          }
          

    }
    checkCollision(ariel, ursula) {
        // simple AABB checking
        if (ariel.x < ursula.x + ursula.width && 
            ariel.x + ariel.width > ursula.x && 
            ariel.y < ursula.y + ursula.height &&
            ariel.height + ariel.y > ursula.y) {
                return true;
        } else {
            return false;
        }
    }
    ursulaExplode(ursula) {
        // temporarily hide ship
        ursula.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ursula.x, ursula.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ursula.reset();                       // reset ship position
          ursula.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ursula.points;
        console.log(ursula.points);
        console.log(this.p1Score);
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');
        
    }
    
    
}
