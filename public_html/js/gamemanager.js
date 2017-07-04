function GameManager() {
    
    this.levelWidth = 25;
    this.level1 = [ '................................................',
                    '................................................',
                    '................................................',
                    '.........,......,....,.....,....................',
                    '................................................',
                    '........4000007|4000000000007...................',
                    '........5222226|5222222222226...................',
                    '...............|................................',
                    '........._.....|..,.....,.......................',
                    '...............|................................',
                    '........4000007|4000000000000000007.............',
                    '........5222226|5222222222222222226.............',
                    '...............|................................',
                    '...............|................................',
                    '...............|................................',
                    '400000000000000000000000000000000000000000000007',
                    '522222222222222222222222222222222222222222222226'
    ];
    
    this.input = null;
    this.level = 0;
    this.playerSpeed = 5;
    this.playerShadowX = 0;
    this.playerShadowY = 0;
    
    this.camera = null;
    this.player = null;
    this.wall = [];
    this.ground = [];
    this.light = [];
}

GameManager.prototype.init = function() {
    this.input = new Input();
};

GameManager.prototype.inputFromKeyboard = function() {
    
    //this.player.speedX = 0;
    //this.player.speedY = 0;
    
    if (this.input.keyRight.isDown) {
        this.player.speedX = this.playerSpeed;
        //console.log(this.player.x+":"+this.player.y);
    }
    if (this.input.keyLeft.isDown) {
        this.player.speedX = -this.playerSpeed;
        //console.log(this.player.x+":"+this.player.y);
    }
    if (this.input.keyDown.isDown) {
        this.player.speedY = this.playerSpeed;
        //console.log(this.player.x+":"+this.player.y);
    }
    if (this.input.keyUp.isDown) {
        this.player.speedY = -this.playerSpeed;
    }
    
    if (!this.input.keyRight.isDown && !this.input.keyLeft.isDown) this.player.speedX = 0;
    if (!this.input.keyDown.isDown && !this.input.keyUp.isDown) this.player.speedY = 0;
};

GameManager.prototype.updateCollection = function(c) {
    for (i = 0; i < c.length; i++) {
        c[i].update();
    }
};

GameManager.prototype.drawCollection = function(c, ctx) {
    for (z = 0; z < c.length; z++) {
//        if (this.player.getTileX(this.camera.x) < c[z].x + (Canvas.scale*2)
//                && this.player.getTileX(this.camera.x) > c[z].x - (Canvas.width + (Canvas.scale / 2))
//                && this.player.getTileY(this.camera.y) < c[z].y  + (Canvas.scale*2)
//                && this.player.getTileY(this.camera.y) > c[z].y - (Canvas.height+Canvas.scale*2)
//                ) {
//            c[z].draw(ctx);
//        }
        c[z].draw(ctx);
    }
};

GameManager.prototype.checkCollisions = function(o1, o2) {
    for (i = 0; i < o2.length; i++) {
        if (o1.collision(o2[i]) && o1.y + o1.height < o2[i].y + o1.speedY) {
            o1.y = Math.floor(o2[i].y - Canvas.scale);
            o1.speedY = 0;
        }
    }
};

GameManager.prototype.update = function() {
    
    this.camera.update(this.player);
    //this.checkCollisions(this.player, this.ground);
    this.player.update();
};

GameManager.prototype.draw = function(ctx) {
    
    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);
    
    // ##########  DRAW EVERYTHING EXCEPT THE PLAYER HERE  ##########
    
    this.drawCollection(this.wall, ctx);
    this.drawCollection(this.ground, ctx);
    this.drawCollection(this.light, ctx);
    
    // #################### //
    
    ctx.restore();
    
    ctx.shadowColor = "black";
    
    //ctx.shadowOffsetX =  Math.max(5, Math.min(10, (this.light[0].x - this.player.x) * 3));
    //ctx.shadowOffsetY = Math.max(5, Math.min(10, (this.light[0].y - this.player.y) * 3));
    ctx.shadowOffsetX =  -(this.light[0].x - this.player.x) * 0.1;
    ctx.shadowOffsetY = -(this.light[0].y - this.player.y) * 0.1;
    ctx.shadowBlur = 20;
    ctx.setShadow(30, 40, 15, 0.4, 0.3, 0.6, 0.5);
    this.player.draw(ctx);
    ctx.shadowColor = "transparent";
};


GameManager.prototype.loadLevel = function(level) {
    this.level = level;
    Sprites.init();
    
    this.camera = new Camera(0, 0);
    
    this.player = new Player(Sprites.player_image, Canvas.scale * 5 , Canvas.scale * 5, Canvas.scale, Canvas.scale, 0.2);
    let col = this.level1.length;
    let row = this.level1[0].length;
    console.log('Map size: rows: '+row+", cols: "+col);
    console.log('Tiles on Y: '+Canvas.tilesOnHeight);
    
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {

            switch (this.level1[j][i]) {
                case '.': {
                        this.wall.push(new Wall(Sprites.wall_image1, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '0': {
                        this.ground.push(new Wall(Sprites.wall_top, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '1': {
                        this.ground.push(new Wall(Sprites.wall_left, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '2': {
                        this.ground.push(new Wall(Sprites.wall_bottom, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '3': {
                        this.ground.push(new Wall(Sprites.wall_right, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '4': {
                        this.ground.push(new Wall(Sprites.wall_left_top, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '5': {
                        this.ground.push(new Wall(Sprites.wall_left_bottom, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '6': {
                        this.ground.push(new Wall(Sprites.wall_right_bottom, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '7': {
                        this.ground.push(new Wall(Sprites.wall_right_top, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '_': {
                        this.light.push(new Light(Sprites.wall_image2, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case ',': {
                        this.wall.push(new Wall(Sprites.wall_image3, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
                case '|': {
                        this.wall.push(new Wall(Sprites.ladder, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale));
                        break;
                }
            }
        }
    }
};