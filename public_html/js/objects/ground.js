
function Ground(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Ground.prototype = Object.create(GameObject.prototype);
Ground.prototype.constructor = Ground;


Ground.prototype.update = function(){
};

Ground.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};
