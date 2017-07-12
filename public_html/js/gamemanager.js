function GameManager() {
    
    this.levelWidth = 25;

    this.input = null;
    this.currentLevel = null;
    this.playerSpeed = 5;
    this.fieldsToLeft = 0;
    this.fieldsToRight = 0;
    this.fieldsToTop = 0;
    this.fieldsToBottom = 0;
    
    this.self = null;
    this.mx = 0;
    this.my = 0;
    
    this.scenery = null;
    this.sx = 0; this.sy = 0;
    this.background = [];
    this.middleground = [];
    this.foreground = [];
    
    this.camera = null;
    this.player = null;
}

GameManager.prototype.init = function() {
    this.input = new Input();
    Sprites.init();
    this.fieldsToLeft = (Canvas.tilesOnWidth / 2)+1;
    this.fieldsToRight = (Canvas.tilesOnWidth / 2)+1;
    this.fieldsToTop = (Canvas.tilesOnHeight / 2)+1;
    this.fieldsToBottom = (Canvas.tilesOnHeight / 2)+1;
    
    console.log('Fields to top: '+this.fieldsToTop);
    console.log('Fields to bottom: '+this.fieldsToBottom);
    console.log('Fields to left: '+this.fieldsToLeft);
    console.log('Fields to right: '+this.fieldsToRight);
};

GameManager.prototype.inputFromKeyboard = function() {

    if (!this.input.keyRight.isDown && !this.input.key_D.isDown) {
        this.player.speedX = 0;
    }
    if (!this.input.keyLeft.isDown && !this.input.key_A.isDown) {
        this.player.speedX = 0;
    }
    if (!this.input.keyUp.isDown && !this.input.key_S.isDown) {
        //this.player.speedY = 0;
    }
    if (!this.input.keyDown.isDown && !this.input.key_W.isDown) {
        //this.player.speedY = 0;
    }

    if ((this.input.keyRight.isDown || this.input.key_D.isDown) && this.player.getTileX(0) < this.currentLevel.width-1) {
        this.player.speedX = this.playerSpeed;
    }
    if ((this.input.keyLeft.isDown || this.input.key_A.isDown) && this.player.getTileX(0) > 0) {
        this.player.speedX = -this.playerSpeed;
    }
    if ((this.input.keyDown.isDown || this.input.key_S.isDown) && this.player.getTileY(0) < this.currentLevel.height-1) {
        //this.player.speedY = this.playerSpeed;
        if (this.player.onLadder) {
            this.player.speedY = this.playerSpeed;
        }
    }
    if ((this.input.keyUp.isDown || this.input.key_W.isDown) && this.player.getTileY(0) > 0) {
        if (this.player.onGround && !this.player.isJumping && !this.player.onLadder) {
                this.player.speedY = -this.playerSpeed;
                this.player.onGround = false;
                this.player.isJumping = true;
        }
        else {
            if (this.player.onLadder) {
                this.player.y -= 6;
                this.player.onGround = false;
                this.player.isJumping = false;
            }
        }
    }
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
    for (j = 0; j < o2[0].length; j++) {
        for (i = 0; i < o2.length; i++) {
            if (o1.collision(o2[i][j])) {
//                if (o2[i][j] instanceof Ladder) {
//                    o1.onLadder = true;
//                    o1.speedY = 0;
//                    o1.onGround = true;
//                    o1.isJumping = false;
//                }
//                else {
                    if (o1.y > o2[i][j].y - o2[i][j].height) {
                        o1.speedY = 0;
                        o1.y = o2[i][j].y - o2[i][j].height;
                        o1.onGround = true;
                        o1.isJumping = false;
                    }
                    if (o1.x + o1.width > o2[i][j].x + 5) {
                        //console.log('RIGHT');
                    }
                //}
            }
        }
    }
};

GameManager.prototype.update = function() {
    
    this.player.onLadder = false;
    this.player.onGround = false;
    
    this.sx = -this.camera.x / 4;
    this.sy = -this.camera.y / 4;
    
    if (this.player.onGround) this.player.speedY = 0;
    else this.player.isJumping = true;
    
    this.player.update();
    this.checkCollisions(this.player, this.middleground);
    this.camera.update(this.player, this);
    
    if (!this.player.onGround) {
        this.player.speedY += this.player.weight;
    }
    
    //console.log(this.player.speedY);
};

GameManager.prototype.drawLayer = function(layer, ctx) {
        for (i = -this.fieldsToLeft; i < this.fieldsToRight; i++) {
        for (j = -this.fieldsToTop; j < this.fieldsToBottom; j++) {
            if (!(layer[j + this.player.getTileY(0), i + this.player.getTileX(0)] instanceof EmptyObject)) {
            if (this.player.getTileX(i) >= 0 && this.player.getTileX(i) <= layer[0].length-1 && this.player.getTileY(j) >= 0 && this.player.getTileY(j) <= this.currentLevel.height-1)
            {
                layer[j + this.player.getTileY(0)][i + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
            }
            else {
                let x = i;
                let y = j;
                // LEWY
                if (this.player.getTileX(i) < 0) {
                    if (this.player.getTileY(j) < 0) {
                        y = j + this.fieldsToTop + this.fieldsToBottom;
                    }
                    if (this.player.getTileY(j) >= 0 && this.player.getTileY(j) < layer.length) {
                        x = i + this.fieldsToLeft + this.fieldsToRight;
                        layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                    }
                }
                // GORA
                if (this.player.getTileY(j) < 0) {
                    if (this.player.getTileX(i) < 0) {
                        x = i + this.fieldsToLeft + this.fieldsToRight;
                    }
                    else {
                        if (this.player.getTileX(i) < layer[0].length) {
                            y = j + this.fieldsToTop + this.fieldsToBottom;
                            layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                        }
                    }
                }
                // LEWA GORA
                if (this.player.getTileX(i) < 0 && this.player.getTileY(j) < 0) {
                    x = i + this.fieldsToLeft + this.fieldsToRight;
                    y = j + this.fieldsToTop + this.fieldsToBottom;
                    layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                }
                // DÓŁ
                if (this.player.getTileY(j) > layer.length) {
                    if (this.player.getTileX(i) < 0) {
                        x = i + this.fieldsToLeft + this.fieldsToRight;
                    }
                    else {
                        if (this.player.getTileX(i) < layer[0].length) {
                            y = j - this.fieldsToTop - this.fieldsToBottom;
                            layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                        }
                    }
                }
                // LEWT DÓŁ
                if (this.player.getTileX(i) < 0 && this.player.getTileY(j) > layer.length) {
                    x = i + this.fieldsToLeft + this.fieldsToRight;
                    y = j - this.fieldsToTop - this.fieldsToBottom;
                    layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                }
                // PRAWY
                if (this.player.getTileX(i) > layer[0].length) {
                    if (this.player.getTileY(j) < 0) {
                        y = j + this.fieldsToTop + this.fieldsToBottom;
                    }
                    if (this.player.getTileY(j) >= 0 && this.player.getTileY(j) < layer.length) {
                        x = i - this.fieldsToLeft - this.fieldsToRight;
                        layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                    }
                }
                // PRAWY DÓŁ
                if (this.player.getTileX(i) > layer[0].length && this.player.getTileY(j) > layer.length) {
                    x = i - this.fieldsToLeft - this.fieldsToRight;
                    y = j - this.fieldsToTop - this.fieldsToBottom;
                    layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                }
                // PRAWA GORA
                if (this.player.getTileX(i) > layer[0].length && this.player.getTileY(j) < 0) {
                    x = i - this.fieldsToLeft - this.fieldsToRight;
                    y = j + this.fieldsToTop + this.fieldsToBottom;
                    layer[y + this.player.getTileY(0)][x + this.player.getTileX(0)].draw(ctx, -this.camera.x, -this.camera.y);
                }
            }
        }
        }
    }
};

GameManager.prototype.draw = function(ctx) {

    ctx.drawImage(this.scenery, this.sx, this.sy, Canvas.width*2, Canvas.height);
    ctx.drawImage(this.scenery, this.sx + Canvas.width*2, this.sy, Canvas.width*2, Canvas.height);

    this.drawLayer(this.background, ctx);
    this.drawLayer(this.middleground, ctx);
    this.drawLayer(this.foreground, ctx);
    
    this.player.draw(ctx, -this.camera.x, -this.camera.y);

    this.drawLayer(this.foreground, ctx);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#e41";
    ctx.fillText("fps: "+Canvas.countFPS(), 10, 20);
    
//    var rx = (this.player.x + this.player.width/2) - this.camera.x;
//    var ry = (this.player.y +this.player.height/2) - this.camera.y;
//    var distance = Math.sqrt( ((this.player.x + this.player.width/2) - this.camera.x - this.mx)*((this.player.x + this.player.width/2) - this.camera.x - this.mx)
//            + (((this.player.y +this.player.height/2) - this.camera.y) - this.my) * (((this.player.y +this.player.height/2) - this.camera.y) - this.my));
//    
//    distance = Math.ceil(distance);
//    var angle = (Math.atan2( ((this.player.y +this.player.height/2) - this.camera.y) - this.my, ((this.player.x +this.player.width/2) - this.camera.x) - this.mx) * 180 / Math.PI);
//    //console.log("angle: "+angle);
//    for (i = 0; i < distance; i++) {
//        rx -= (Math.cos(angle * Math.PI / 180));
//        ry -= (Math.sin(angle * Math.PI / 180));
//        //if (this.background[ktory] instanceof Light)
//        ctx.fillRect(rx, ry, 2, 2);
//    }
    
//    ctx.beginPath();
//    ctx.moveTo(this.mx * 1.1, this.my * 1.1);
//    ctx.lineTo((this.player.x + this.player.width/2) - this.camera.x, (this.player.y +this.player.height/2) - this.camera.y);
//    ctx.stroke();
};


GameManager.prototype.loadLevel = function(level) {
    
    
    this.currentLevel = new Level();
    this.currentLevel.load(level);
        
    this.camera = new Camera(0, 0);
    
    this.scenery = Sprites.scenery;
    
    var self = this;
    
    Canvas.canvas.addEventListener('mousemove', function(event) {
        var rect = Canvas.canvas.getBoundingClientRect();
        self.mx = Math.floor(event.clientX - rect.left);
        self.my = Math.floor(event.clientY - rect.top);
    }, false);
    
    let col = this.currentLevel.height;
    let row = this.currentLevel.width;
    console.log('Map size: rows: '+row+", cols: "+col);
    console.log('Tiles on Y: '+Canvas.tilesOnHeight);
    
    // INIT ARRAYS
    for (j = 0; j < col; j++) {
        this.background[j] = [];
        for (i = 0; i < row; i++) {
            this.background[j][i] = 0;
        }
    }
    for (j = 0; j < col; j++) {
        this.middleground[j] = [];
        for (i = 0; i < row; i++) {
            this.middleground[j][i] = 0;
        }
    }
    for (j = 0; j < col; j++) {
        this.foreground[j] = [];
        for (i = 0; i < row; i++) {
            this.foreground[j][i] = 0;
        }
    }
    
    // LOAD BACKGROUND
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {
            switch (this.currentLevel.background[j][i]) {
                case '.': {
                        this.background[j][i] = new Wall(Sprites.wallSheet, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale, 2, 0);
                        break;
                }
                case 'a': {
                        this.background[j][i] = new Wall(Sprites.wallSheet, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale, 0, 0);
                        break;
                }
                case 'b': {
                        this.background[j][i] = new Wall(Sprites.wallSheet, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale, 1, 0);
                        break;
                }
                default: {
                        this.background[j][i] = new EmptyObject();
                        break;
                }
            }
        }
    }
    
    // LOAD MIDDLEGROUND
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {
            switch (this.currentLevel.middleground[j][i]) {
                case ',': {
                        this.middleground[j][i] = new Light(Sprites.wallSheet, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale, 1, 1);
                        break;
                }
                case 'P': {
                        this.middleground[j][i] = new EmptyObject();
                        this.player = new Player(Sprites.player_image, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 0.2);
                        break;
                }
                case 'L': {
                        this.middleground[j][i] = new Ladder(Sprites.wallSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 0, 1);
                        break;
                }
                case '0': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 0, 0);
                        break;
                }
                case '1': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 1, 0);
                        break;
                }
                case '2': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 2, 0);
                        break;
                }
                case '3': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 2, 1);
                        break;
                }
                case '4': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 2, 2);
                        break;
                }
                case '5': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 1, 2);
                        break;
                }
                case '6': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 0, 2);
                        break;
                }
                case '7': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 0, 1);
                        break;
                }
                case '8': {
                        this.middleground[j][i] = new Ground(Sprites.groundSheet, Canvas.scale * i , Canvas.scale * j, Canvas.scale, Canvas.scale, 1, 1);
                        break;
                }

                default: {
                        this.middleground[j][i] = new EmptyObject();
                        break;
                }
            }
        }
    }
    
    // LOAD FOREGROUND
    for (j = 0; j < col; j++) {
        for (i = 0; i < row; i++) {
            switch (this.currentLevel.foreground[j][i]) {
                case '_': {
                        this.foreground[j][i] = new Wall(Sprites.wallSheet, i * Canvas.scale, j * Canvas.scale, Canvas.scale, Canvas.scale, 0, 1);
                        break;
                }
                default: {
                        this.foreground[j][i] = new EmptyObject();
                        break;
                }
            }
        }
    }
};