
function Wall(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;


Wall.prototype.update = function(){
    
};

Wall.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

