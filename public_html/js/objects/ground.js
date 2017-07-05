
function Ground(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Ground.prototype = Object.create(GameObject.prototype);
Ground.prototype.constructor = Ground;


Ground.prototype.update = function(){
};

Ground.prototype.draw = function(ctx, offsetX, offsetY){
    ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, this.width, this.height);
};
