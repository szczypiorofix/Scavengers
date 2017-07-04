function GameObject(image, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
}

GameObject.prototype.update = function() {
};

GameObject.prototype.draw = function(ctx) {
};

GameObject.prototype.collision = function(ob1) {
    if (this.x + Math.floor(Canvas.scale) > ob1.x 
            && this.x < ob1.x + ob1.width
            && this.y > ob1.y - Math.floor(Canvas.scale)
            && this.y < ob1.y + ob1.height
            )
    return true;
};