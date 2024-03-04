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
    this.load.image('bg', 'assets/bg.png');
    this.load.image('platform', 'assets/platform.jpg');
    this.load.image('stone', 'assets/stone.jpg');

    
}

function create()
{

    
    this.add.tileSprite(0,0, wordWidth, 1080, "bg").setOrigin(0,0).setScale(4);
    platforms = this.physics.add.staticGroup();
   for(var x=0; x<wordWidth; x=x+36*5)
    {
        console.log(x)
        platforms.create(x, 1080-36*5, 'platform').setOrigin(0,0).refreshBody().setScale(5);
        
    }
    /*for (var x = 0; x < worldwidth; x = x + Phaser.Math. FloatBetween (400, 500)){
        var y = Phaser.Math.FloatBetween (100, 1000)
        console.log(Fx,y)
        platforms.create(x, y, 'platform');
        }*/

    player = this.physics.add.sprite(100, 450, 'pes');

    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    this.physics.add.collider(platforms, player);

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0,0, wordWidth, 1080);
    this.physics.world.setBounds(0,0, wordWidth,1080);
    this.cameras.main.startFollow(player);

    stone = this.physics.add.staticGroup();

    /*for(var  x=0; x<wordWidt; x=x+Phaser.Math.FloatBetween(200,600) )
    {
        var y = 960;
        console.log(x,y);
        stones.create(x,y,'stone').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(1,3));
    } */
    
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

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
//document.getElementById('score').innerText()