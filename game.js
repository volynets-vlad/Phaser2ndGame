var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
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

function preload()
{

}

function create()
{
    
}

function update()
{
    
}
document.getElementById('score').innerText()