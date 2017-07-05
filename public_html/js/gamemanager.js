function GameManager() {
    
    this.levelWidth = 25;
    this.level1 = [
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................',
        '.........................................................................'
    ];
    
    this.input = null;
    this.level = 0;
    this.playerSpeed = 5;
    this.fieldsToLeft = 0;
    this.fieldsToRight = 0;
    this.fieldsToTop = 0;
    this.fieldsToBottom = 0;
    
    
    this.background = [];
    
    
    this.camera = null;
    this.player = null;
}

GameManager.prototype.init = function() {
    this.input = new Input();
};

GameManager.prototype.inputFromKeyboard = function() {
    
    this.player.speedX = 0;
    this.player.speedY = 0;
    
    if (this.input.keyRight.isDown && this.player.getTileX(0) < this.background[0].length-1) {
        this.player.speedX = this.playerSpeed;
    }
    if (this.input.keyLeft.isDown && this.player.getTileX(0) > 0) {
        this.player.speedX = -this.playerSpeed;
    }
    if (this.input.keyDown.isDown && this.player.getTileY(0) < this.background.length-1) {
        this.player.speedY = this.playerSpeed;
    }
    if (this.input.keyUp.isDown && this.player.getTileY(0) > 0) {
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
        if (this.player.getTileX(0) < c[z].x) {
            c[z].draw(ctx, -this.camera.x, -this.camera.y);
        }
    }
    //console.log(this.player.getTileX(0)+":"+this.player.getTileY(0));
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
    this.player.update();
    this.camera.update(this.player, this);
    //this.checkCollisions(this.player, this.ground);
};

GameManager.prototype.draw = function(ctx) {
    for (i = -this.fieldsToLeft; i < this.fieldsToRight; i++) {
        for (j = -this.fieldsToTop; j < this.fieldsToBottom; j++) {
            
            if (this.player.getTileX(i) >= 0 && this.player.getTileX(i) <= this.background[0].length-1 && this.player.getTileY(j) >= 0 && this.player.getTileY(j) <= this.background.length-1)
            {
                this.background[j + this.player.getTileY(0)][i + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
            }
            else {
                if (i < 0) {
                    //let x = i + this.fieldsToLeft + this.fieldsToRight;
                    //this.background[j + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                }
            }
        }
    }
    this.player.draw(ctx, -this.camera.x, -this.camera.y);
};


GameManager.prototype.loadLevel = function(level) {
    this.level = level;
    Sprites.init();
    
    this.fieldsToLeft = Math.ceil((Canvas.width/2) / Canvas.scale)+1;
    this.fieldsToRight = Math.ceil((Canvas.width/2) / Canvas.scale)+1;
    this.fieldsToTop = Math.ceil((Canvas.height/2) / Canvas.scale)+1;
    this.fieldsToBottom = Math.ceil((Canvas.height/2) / Canvas.scale)+1;
    
    console.log('Fields to top: '+this.fieldsToTop);
    console.log('Fields to bottom: '+this.fieldsToBottom);
    console.log('Fields to left: '+this.fieldsToLeft);
    console.log('Fields to right: '+this.fieldsToRight);
    
    this.camera = new Camera(0, 0);
    
    this.player = new Player(Sprites.player_image, Canvas.scale * 20 , Canvas.scale * 10, Canvas.scale, Canvas.scale, 0.2);
    
    let col = this.level1.length;
    let row = this.level1[0].length;
    console.log('Map size: rows: '+row+", cols: "+col);
    console.log('Tiles on Y: '+Canvas.tilesOnHeight);
    
    
    for (j = 0; j < col; j++) {
        this.background[j] = [];
        for (i = 0; i < row; i++) {
            this.background[j][i] = 0;
        }
    }
    
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {
            switch (this.level1[j][i]) {
                case '.': {
                        this.background[j][i] = new Wall(Sprites.wall_image1, i * Canvas.scale, j * Canvas.scale, Canvas.scale-1, Canvas.scale-1);
                        break;
                }
                default: {
                        this.background[j][i] = -1;
                        break;
                }
            }
        }
    }
};