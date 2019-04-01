// ################### EMPTY OBJECT ################### //
function EmptyObject(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

EmptyObject.prototype = Object.create(GameObject.prototype);
EmptyObject.prototype.constructor = EmptyObject;


EmptyObject.prototype.update = function(){
};

EmptyObject.prototype.draw = function(ctx, offsetX, offsetY){
};



// ################### WALL ################### //
function Wall(spritesheet, x, y, width, height, r, c) {
    this.spritesheet = spritesheet;
    this.row = r;
    this.col = c;
    GameObject.call(this, spritesheet, x, y, width, height);
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function(){
};

Wall.prototype.draw = function(ctx, offsetX, offsetY){
    Sprites.drawSprite(ctx, this.spritesheet, {x: this.x + offsetX, y: this.y + offsetY, row: this.row, col: this.col});
};



// ################### GROUND ################### //
function Ground(spritesheet, x, y, width, height, r, c) {
    this.spritesheet = spritesheet;
    this.row = r;
    this.col = c;
    GameObject.call(this, spritesheet, x, y, width, height);
}

Ground.prototype = Object.create(GameObject.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function(){
};

Ground.prototype.draw = function(ctx, offsetX, offsetY){
    Sprites.drawSprite(ctx, this.spritesheet, {x: this.x + offsetX, y: this.y + offsetY, row: this.row, col: this.col});
};



// ################### LIGHT ################### //
function Light(spritesheet, x, y, width, height, r, c) {
    this.spritesheet = spritesheet;
    this.row = r;
    this.col = c;
    GameObject.call(this, spritesheet, x, y, width, height);
}

Light.prototype = Object.create(GameObject.prototype);
Light.prototype.constructor = Light;


Light.prototype.update = function(){
};

Light.prototype.draw = function(ctx, offsetX, offsetY){
    Sprites.drawSprite(ctx, this.spritesheet, {x: this.x + offsetX, y: this.y + offsetY, row: this.row, col: this.col});
};



// ################### LADDER ################### //
function Ladder(spritesheet, x, y, width, height, r, c) {
    this.spritesheet = spritesheet;
    this.row = r;
    this.col = c;
    GameObject.call(this, spritesheet, x, y, width, height);
}

Ladder.prototype = Object.create(GameObject.prototype);
Ladder.prototype.constructor = Ladder;


Ladder.prototype.update = function(){
};

Ladder.prototype.draw = function(ctx, offsetX, offsetY){
    Sprites.drawSprite(ctx, this.spritesheet, {x: this.x + offsetX, y: this.y + offsetY, row: this.row, col: this.col});
};
