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

var tntStep = Phaser.Math.FloatBetween(1500, 2500)
var gameOver = false;
var life = 5;
var score = 0;
var starStep = 100;
var scoreText;
var lifeText;
var stars;
var game = new Phaser.Game(config);
var worldWidth = config.width * 5;

function preload() {
    this.load.image('pes', 'assets/pes.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('platform', 'assets/platform.png');

    this.load.image('pen', 'assets/pen.png');
    this.load.image('stone', 'assets/stone.png');
    this.load.image('tree', 'assets/tree.png');

    this.load.image('SP', 'assets/skyPlatform.png');
    this.load.image('SPL', 'assets/skyPlatformL.png');
    this.load.image('SPR', 'assets/skyPlatformR.png');

    this.load.image('star', 'assets/star.webp');
    this.load.image('tnt', 'assets/tnt.png');
    this.load.image('boom', 'assets/boom.webp');

}

function create() {


    this.add.tileSprite(0, 0, worldWidth, 1080, "bg")
        .setOrigin(0, 0)
        .setScale(1.5)
        .setDepth(0);
    
        
    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + 128) {
        console.log(x)
        platforms.create(x, 1080 - 128, 'platform').setOrigin(0, 0).refreshBody();

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



    this.cameras.main.setBounds(0, 0, worldWidth, 1080);
    this.physics.world.setBounds(0, 0, worldWidth, 1080);
    this.cameras.main.startFollow(player);



    stone = this.physics.add.staticGroup();
    pen = this.physics.add.staticGroup();
    tree = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(600, 1000)) {

        stone
            .create(x, 1080 - 128, 'stone')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(3, 1.5, 0.2))
            .setDepth(Phaser.Math.Between(1, 10));
        console.log(stone.X, stone.Y)
    }
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(1100, 1700)) {

        pen
            .create(x, 1080 - 128, 'pen')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(2, .5))
            .setDepth(Phaser.Math.Between(1, 10));
        console.log(pen.X, pen.Y)
    }
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(900, 1500)) {

        tree
            .create(x, 1080 - 128, 'tree')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(2, .5))
            .setDepth(Phaser.Math.Between(1, 10));
        console.log(tree.X, tree.Y)
    }




    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(800, 1000)) {

        var y = Phaser.Math.Between(100, 800)

        platforms
            .create(x, y, 'SPL')
            .setScale(1.5);

        for (var i = 1; i < Phaser.Math.Between(1, 5); i++) {
            platforms.create(x + 128 * 1.5 * i, y, 'SP')
                .setScale(1.5);
        }

        platforms.create(x + 128 * 1.5 * i, y, 'SPR')
            .setScale(1.5);
    }

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '90px', fill: 'black' })
    .setOrigin(0,0)
    .setScrollFactor(0)
    .setDepth(1)

    lifeText = this.add.text(1370, 30, showLife(), { fontSize: '80px', fill: '#FFF' })
        .setOrigin(0, 0)
        .setScrollFactor (0)
    
    var resetButton = this.add.text(10, 1000, 'reset', { fontSize: '90px', fill: 'black' })
        .setInteractive()
        .setScrollFactor(0);

    resetButton.on('pointerdown', function () {
        /*console.log('restart')
        self.ghysics.resume();
        gameOver = false;
        self.scene.restart();*/
        location.reload();
    });
    



    stars = this.physics.add.group({
        key: 'star',
        repeat: worldWidth / starStep,
        setXY: { x: 12, y: 0, stepX: starStep }
    });
    stars.children.iterate(function (child) {

        child
            .setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
            .setScale(0.3)
            .setDepth(5);

    });
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);


        tnt = this.physics.add.group({
            key: 'tnt',
            repeat:worldWidth/ tntStep,
            setXY: { x: Phaser.Math.FloatBetween(700, 1000), y: 0, stepX: tntStep }
        });

        tnt.children.iterate(function (child) {

            child
                .setBounceY(Phaser.Math.FloatBetween(0.1, 0.3))
                .setScale(0.15)
                .setDepth(5);

        });
 
    

    this.physics.add.collider(tnt, platforms);
    this.physics.add.overlap(player, tnt, collectStar, null, this);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-config.playerSpeed);


    }
    else if (cursors.right.isDown) {
        player.setVelocityX(config.playerSpeed);

        //player.anims.play('left', true);
    }
    else {
        player.setVelocityX(0);


    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }




}
function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('score: ' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
    }
}

//function showLife(): string

function showLife() {
    var lifeLine = ''

    for (var i = 0; i < life; i++) {
    //lifeLine = lifeLine + '💜'
    lifeLine += '💜'
    //console.log(life)
    }
    return lifeLine;
}
  
var hitTnt = false;


function boom(player, tnt) {
    //tnt.disableBody(true, true);
    //this.add.image(100,100,'boom');
    if (hitTnt){
        return;
    }
    hitTnt= true;
    lives = lives -1;
    lifeText.setText(showLife());


    if (tnt.countActive(true) === 0) {
        tnt.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);
           
        });
    }
}

//document.getElementById('score').innerText()