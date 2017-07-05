
function Light(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Light.prototype = Object.create(GameObject.prototype);
Light.prototype.constructor = Light;


Light.prototype.update = function(){
};

Light.prototype.draw = function(ctx, offsetX, offsetY){
    ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, this.width, this.height);
};

