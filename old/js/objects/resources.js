function ResWood(spritesheet, x, y, width, height, r, c) {
    this.spritesheet = spritesheet;
    this.row = r;
    this.col = c;
    GameObject.call(this, spritesheet, x, y, width, height);
}

ResWood.prototype = Object.create(GameObject.prototype);
ResWood.prototype.constructor = ResWood;


ResWood.prototype.update = function(){
};

ResWood.prototype.draw = function(ctx, offsetX, offsetY){
    Sprites.drawSprite(ctx, this.spritesheet, {x: this.x + offsetX, y: this.y + offsetY, row: this.row, col: this.col});
};
