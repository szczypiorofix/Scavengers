function GameObject(image, x, y, width, height, weight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.gravity = 20;
    this.weight = weight || 0;
}

GameObject.prototype.update = function() {
};

GameObject.prototype.draw = function(ctx, offsetX, offsetY) {
};

GameObject.prototype.collision = function(ob1) {
    if (this.x < ob1.x + ob1.width &&
        this.x + this.width > ob1.x &&
        this.y < ob1.y + ob1.height &&
        this.y + this.height > ob1.y
        )
    return true;
};