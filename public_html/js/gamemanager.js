function GameManager() {
    
    this.levelWidth = 25;
    this.level1 = [ '................................................',
                    '................................................',
                    '................................................',
                    '.........,..._..,.._.,.._..,....................',
                    '................................................',
                    '........400000000000000000007...................',
                    '........522222222222222222226...................',
                    '...............|................................',
                    '...............|................................',
                    '...............|................................',
                    '.....400000000007...............................',
                    '.....1..........3...............................',
                    '.....1..........3...............................',
                    '.....1..........3...............................',
                    '.....522222222226...............................',
                    '................................................',
                    '................................................'
    ];
    
    this.input = null;
    this.level = 0;
    this.playerSpeed = 5;
    
    this.camera = null;
    this.player = null;
    this.wall = [];
    this.ground = [];
}

GameManager.prototype.init = function() {
    this.input = new Input();
};

GameManager.prototype.inputFromKeyboard = function() {
    
    this.player.speedX = 0;
    this.player.speedY = 0;
    
    if (this.input.keyRight.isDown) {
        this.player.speedX = this.playerSpeed;
    }
    if (this.input.keyLeft.isDown) {
        this.player.speedX = -this.playerSpeed;
    }
    if (this.input.keyDown.isDown) {
        this.player.speedY = this.playerSpeed;
    }
    if (this.input.keyUp.isDown) {
        this.player.speedY = -this.playerSpeed;
    }
};

GameManager.prototype.updateCollection = function(c) {
    for (i = 0; i < c.length; i++) {
        c[i].update();
    }
};

GameManager.prototype.drawCollection = function(c, ctx) {
    for (z = 0; z < c.length; z++) {
        if (this.player.getTileX(this.camera.x) < c[z].x + (Canvas.scale*2)
                && this.player.getTileX(this.camera.x) > c[z].x - (Canvas.width + (Canvas.scale / 2))
                && this.player.getTileY(this.camera.y) < c[z].y  + (Canvas.scale*2)
                && this.player.getTileY(this.camera.y) > c[z].y - (Canvas.height+Canvas.scale*2)
                ) {
            c[z].draw(ctx);
        }
    }
};

GameManager.prototype.checkCollisions = function(o1, o2) {
    for (i = 0; i < o2.length; i++) {
        if (o1.collision(o2[i])) {
            
            if (o2[i].x > o1.x - this.playerSpeed) {
                o1.x -= o1.speedX+3;
            }
            else if (o2[i].x + o2[i].width < o1.x) {
                o1.x += this.playerSpeed;
            }
            else if (o2[i].y > o1.y) {
                o1.y -= this.playerSpeed;
            }
            else if (o2[i].y + o2[i].width < o1.y) {
                o1.y += this.playerSpeed;
            }
        }
    }
};

GameManager.prototype.update = function() {
    
    this.camera.update(this.player);
    this.checkCollisions(this.player, this.ground);
    this.player.update();
};

GameManager.prototype.draw = function(ctx) {
    
    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);
    
    // ##########  DRAW EVERYTHING EXCEPT THE PLAYER HERE  ##########
    
    this.drawCollection(this.wall, ctx);
    this.drawCollection(this.ground, ctx);
    
    // #################### //
    
    ctx.restore();
    
    this.player.draw(ctx);
};


GameManager.prototype.loadLevel = function(level) {
    this.level = level;
    Sprites.init();
    
    this.camera = new Camera(0, 0);
    
    this.player = new Player(Sprites.player_image, 0 , 0, Canvas.scale, Canvas.scale);
    let col = this.level1.length;
    let row = this.level1[0].length;
    console.log('Map size: rows: '+row+", cols: "+col);
    console.log('Tiles on Y: '+Canvas.tilesOnHeight);
    
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {

            switch (this.level1[j][i]) {
                case '.': {
                        this.wall.push(new Wall(Sprites.wall_image1, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '0': {
                        this.ground.push(new Wall(Sprites.wall_top, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '1': {
                        this.ground.push(new Wall(Sprites.wall_left, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '2': {
                        this.ground.push(new Wall(Sprites.wall_bottom, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '3': {
                        this.ground.push(new Wall(Sprites.wall_right, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '4': {
                        this.ground.push(new Wall(Sprites.wall_left_top, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '5': {
                        this.ground.push(new Wall(Sprites.wall_left_bottom, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '6': {
                        this.ground.push(new Wall(Sprites.wall_right_bottom, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '7': {
                        this.ground.push(new Wall(Sprites.wall_right_top, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '_': {
                        this.wall.push(new Wall(Sprites.wall_image2, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case ',': {
                        this.wall.push(new Wall(Sprites.wall_image3, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '|': {
                        this.wall.push(new Wall(Sprites.ladder, (i * Canvas.scale), j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
            }
        }
    }
};