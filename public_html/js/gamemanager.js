function GameManager() {
    
    this.input = null;
    this.level = 0;
    
    this.player = null;
}

GameManager.prototype.init = function() {
    this.input = new Input();
    console.log('Input OK');
};

GameManager.prototype.inputFromKeyboard = function() {
    
    this.player.speedX = 0;
    this.player.speedY = 0;
    
    if (this.input.keyRight.isDown) {
        this.player.speedX = 3;
    }
    if (this.input.keyLeft.isDown) {
        this.player.speedX = -3;
    }
    if (this.input.keyDown.isDown) {
        this.player.speedY = 3;
    }
    if (this.input.keyUp.isDown) {
        this.player.speedY = -3;
    }
};

GameManager.prototype.update = function() {
    this.player.update();
};

GameManager.prototype.draw = function(ctx) {
    
    this.player.draw(ctx);
};


GameManager.prototype.loadLevel = function(level) {
    this.level = level;
    var image = new Image();
    image.src = 'images/player.png';
    
    this.player = new Player(image, 50, 50, 16, 16);
    
};