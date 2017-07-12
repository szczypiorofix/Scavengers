
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

