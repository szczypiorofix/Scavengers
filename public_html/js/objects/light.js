
function Light(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Light.prototype = Object.create(GameObject.prototype);
Light.prototype.constructor = Light;


Light.prototype.update = function(){
    
};

Light.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

