import Phaser from 'phaser'



let platforms;
let acid;
let spike;
let player;
let cursors;
let stars;
let scoreText;
let gameOver;
let score = 1;
let portal;
let vida = 3;
let vidaText;
let countvida = 3;

export class Game1 extends Phaser.Scene
{
    constructor() {
        super('Game1');

    }

    

    preload ()
{
    this.load.image('spike', './src/assets/spike.png');
    this.load.image('acid', './src/assets/acid.png');
    this.load.image('plataforma', './src/assets/base3.png');
    this.load.image('plataforma2', './src/assets/base4.png');
    this.load.image('low_terra', './src/assets/base.png');
    this.load.image('sky', './src/assets/fondo.png');
    this.load.image('star', './src/assets/star.png');
    this.load.spritesheet('dude', './src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('portal', './src/assets/portal.png');
    this.load.image('vida', './src/assets/vida.png');


}

 create ()
{

    this.add.image(600, 350, 'sky');
    
    platforms = this.physics.add.staticGroup();

    
    platforms.create(20, 1200, 'low_terra').refreshBody();

    platforms.create(500, 1200, 'low_terra');
    platforms.create(875, 1025, 'low_terra');
    platforms.create(550, 850, 'plataforma');
    platforms.create(250, 775, 'plataforma');
    platforms.create(50, 650, 'plataforma');
    platforms.create(300, 500, 'plataforma');
    platforms.create(400, 450, 'plataforma2');
    platforms.create(550, 450, 'plataforma2');
    platforms.create(700, 450, 'plataforma2');
    platforms.create(1000, 380, 'plataforma');

    
    acid = this.physics.add.staticGroup();
    acid.create(260, 1290, 'acid');
    acid.create(755, 1290, 'acid');
    acid.create(975, 1290, 'acid');
    acid.create(1100, 1290, 'acid');

    portal = this.physics.add.staticGroup();
    portal.create(1000, 250, 'portal');

    spike = this.physics.add.staticGroup();
    spike.create(485, 355, 'spike');
    spike.create(650, 355, 'spike');

    player = this.physics.add.sprite(100, 1000, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame:  4} ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 100 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });



    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    vidaText = this.add.text(1110, 16, 'X '+vida, { fontSize: '32px', fill: '#000' });


    
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, spike, hitSpike, null, this);
    this.physics.add.collider(player, acid, hitAcid, null, this);

    this.physics.add.collider(player, portal, seguentNivell, null, this);

    let vidaImg = this.add.image(1070,30,'vida');
    vidaImg.setScale(0.2);
    

}

 update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    
}

}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

    }
}

function hitSpike (player, spike)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    vida -= 1;
    countvida-=1;
    vidaText.setText('X ' + vida);

    this.time.addEvent({
        delay: 1000,
        
        callback: (countvida) => {
                       
            player.clearTint();
            this.scene.start('Game1',{score:score});
            }
        
    });

    if(countvida < 0) {
        this.scene.start('GameOver');

    }
    
    
}

function hitAcid (player, acid)
{
    this.physics.pause();

    player.setTint(0xff0000);
    

    player.anims.play('turn');

    vida -= 1;
    countvida-=1;
    vidaText.setText('X ' + vida);

    this.time.addEvent({
        delay: 1000,
        
        callback: (countvida) => {
                       
            player.clearTint();
            this.scene.start('Game1',{score:score});
            }
        
    });

    if(countvida < 0) {
        this.scene.start('GameOver');

    }
    

}

function seguentNivell(){
    //musica1.stop()
    this.scene.start('Game2',{score:score})
}

export default Game1;