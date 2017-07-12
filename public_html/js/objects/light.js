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

