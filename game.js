var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: game,
    playerSpeed: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var worldWidth = config.width*5;

function preload()
{
    this.load.image('pes', 'assets/pes.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('platform', 'assets/platform.png');

    this.load.image('pen', 'assets/pen.jpg');
    this.load.image('stone', 'assets/stone.jpg');

    this.load.image('SP', 'assets/skyPlatform.jpg');
    this.load.image('SPL', 'assets/skyPlatformL.jpg');
    this.load.image('SPR', 'assets/skyPlatformR.jpg');   
}

function create()
{

    
    this.add.tileSprite(0,0, worldWidth, 1080, "bg")
        .setOrigin(0,0)
        .setScale(1.5);
    platforms = this.physics.add.staticGroup();
   for(var x=0; x<worldWidth; x=x+128)
    {
        console.log(x)
        platforms.create(x, 1080-128, 'platform').setOrigin(0,0).refreshBody();
        
    }
    /*for (var x = 0; x < worldwidth; x = x + Phaser.Math. FloatBetween (400, 500)){
        var y = Phaser.Math.FloatBetween (100, 1000)
        console.log(Fx,y)
        platforms.create(x, y, 'platform');
        }*/

    player = this.physics.add.sprite(100, 450, 'pes');

    player
    .setDepth(5)
    .setBounce(0.2)
    .setCollideWorldBounds(false);

    this.physics.add.collider(platforms, player);



    cursors = this.input.keyboard.createCursorKeys();



    this.cameras.main.setBounds(0,0, worldWidth, 1080);
    this.physics.world.setBounds(0,0, worldWidth,1080);
    this.cameras.main.startFollow(player);



    stone = this.physics.add.staticGroup();
    pen = this.physics.add.staticGroup();
    
    for (var x = 0; x < worldWidth; x = x + Phaser.Math. FloatBetween (400, 700)) {
    
        stone
        .create(x, 1080 - 36*5, 'stone')
        .setOrigin(0, 1)
        .setScale (Phaser.Math.FloatBetween(10, 4, 2))
        .setDepth (Phaser.Math.Between(1, 10));
    console.log(stone.X, stone.Y)
    }
    for (var x = 0; x < worldWidth; x = x + Phaser.Math. FloatBetween (500, 1000)) {
    
        pen
        .create(x, 1080 - 36*5, 'pen')
        .setOrigin(0, 1)
        .setScale (Phaser.Math.FloatBetween(7, 3))
        .setDepth (Phaser.Math.Between(1, 10));
    console.log(pen.X, pen.Y)
    }




    for (var x = 0; x < worldWidth; x = x + Phaser. Math. Between (800, 1000)) {
        
        var y = Phaser.Math.Between (100, 800)

        platforms
        .create(x, y, 'SPL')
        .setScale(4);

        for(var i = 1; i < Phaser.Math.Between (1, 5); i++){
        platforms.create(x + 36*4*i, y, 'SP')
        .setScale(4); 
        }

        platforms.create(x + 36*4 * i, y, 'SPR')
        .setScale(4);
        }
}

function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-config.playerSpeed);

      
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(config.playerSpeed);

        //player.anims.play('left', true);
    }
    else
    {
        player.setVelocityX(0);

    
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }
}
//document.getElementById('score').innerText()