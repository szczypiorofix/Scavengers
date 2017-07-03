function GameObject(image, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.scale = 2;
    this.speedX = 0;
    this.speedY = 0;
}

GameObject.prototype.update = function() {
    
};

GameObject.prototype.draw = function(ctx) {
    //ctx.drawImage(this.image, this.x, this.y, this.width * this.scale, this.height * this.scale);
};