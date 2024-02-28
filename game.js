var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1000,
    parent: game,
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
var wordWidth = 9600;

function preload()
{
    this.load.image('pes', 'assets/pes.png');
    this.load.image('bg', 'assets/bg.jpg');
    this.load.image('platform', 'assets/platform.png');

    
}

function create()
{

    
    this.add.tileSprite(0,0, wordWidth, 1080, "bg").setOrigin(0,0);
    platforms = this.physics.add.staticGroup();
   for(var x=0; x<wordWidth; x=x+360)
    {
        console.log(x)
        platforms.create(x, 1080-100, 'platform').setOrigin(0,0).refreshBody();
        
    }
    /*for (var x = 0; x < worldwidth; x = x + Phaser.Math. FloatBetween (400, 500)){
        var y = Phaser.Math.FloatBetween (100, 1000)
        console.log(Fx,y)
        platforms.create(x, y, 'platform');
        }*/

    player = this.physics.add.sprite(100, 450, 'pes');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0,0, wordWidth, 1080);
    this.physics.world.setBounds(0,0, wordWidth,1080);
    this.cameras.main.startFollow(player);
    
}

function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-250);

      
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(250);

        //player.anims.play('left', true);
    }
    else
    {
        player.setVelocityX(0);

    
    }

    if (cursors.up.isDown/* && player.body.touching.down*/)
    {
        player.setVelocityY(-330);
    }
}
//document.getElementById('score').innerText()