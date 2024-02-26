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

function preload()
{
    this.load.image('pes', 'assets/pes.png');
    this.load.image('bg', 'assets/bg.png');

}

function create()
{

    
    this.add.image(500,500, 'bg');
    player = this.physics.add.sprite(100, 450, 'pes');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();


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