
function Wall(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;


Wall.prototype.update = function(){
};

Wall.prototype.draw = function(ctx, offsetX, offsetY){
    ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, this.width, this.height);
};

