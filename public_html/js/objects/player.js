
function Player(image, x, y, width, height, weight) {
    this.speedX = 0;
    this.speedY = 0;
    GameObject.call(this, image, x, y, width, height, weight);
}

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;    
};

Player.prototype.getTileX = function(offset) {
    return Math.floor(((this.x + (this.width/2)) / Canvas.scale)) +offset;
};

Player.prototype.getTileY = function(offset) {
    return Math.floor(((this.y + (this.height/2)) / Canvas.scale)) +offset;
};


Player.prototype.draw = function(ctx, offsetX, offsetY){
    ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, this.width, this.height);
};
