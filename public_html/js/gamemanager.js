function GameManager() {
    
    this.input = null;
    this.level = 0;
    
    this.player = null;
    this.ground = [];
    this.wall = [];
}

GameManager.prototype.init = function() {
    this.input = new Input();
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

GameManager.prototype.updateCollection = function(c) {
    for (i = 0; i < c.length; i++) {
        c[i].update();
    }
};

GameManager.prototype.drawCollection = function(c, ctx) {
    for (i = 0; i < c.length; i++) {
        c[i].draw(ctx);
    }
};

GameManager.prototype.update = function() {
    this.updateCollection(this.ground);
    this.updateCollection(this.wall);
    this.player.update();
};

GameManager.prototype.draw = function(ctx) {
    
    ctx.save();
    ctx.translate(-this.player.x, -this.player.y);
    
    // ##########  DRAW EVERYTHING EXCEPT THE PLAYER HERE  ##########
    
    this.drawCollection(this.ground, ctx);
    this.drawCollection(this.wall, ctx);
    
    // #################### //
    
    ctx.restore();
    
    this.player.draw(ctx);
};


GameManager.prototype.loadLevel = function(level) {
    this.level = level;
    Sprites.init();
    
    this.player = new Player(Sprites.player_image, -250, -250, 16, 16);
    
    
    for (i = 0; i < 10; i++) {
        this.wall.push(new Wall(Sprites.wall_image1, i*32, 32, 16, 16));
    }
    for (i = 0; i < 10; i++) {
        this.wall.push(new Wall(Sprites.wall_image1, i*32, 64, 16, 16));
    }
    for (i = 0; i < 10; i++) {
        this.wall.push(new Wall(Sprites.wall_image1, i*32, 96, 16, 16));
    }
    
    for (i = 0; i < 10; i++) {
        this.ground.push(new Ground(Sprites.ground_image1, i*32, 128, 16, 16));
    }
    
};