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
