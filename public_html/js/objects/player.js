
function Player(image, x, y, width, height, weight) {
    this.speedX = 0;
    this.speedY = 0;
    GameObject.call(this, image, x, y, width, height, weight);
}

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {
    
    //if (this.speedY < this.gravity) this.speedY += this.weight;
    
    this.x += this.speedX;
    this.y += this.speedY;
};

Player.prototype.getTileX = function(offset) {
    return Math.floor(((this.x + (this.width/2)) / Canvas.scale) +((Canvas.width / Canvas.scale)/2)  +offset);
};

Player.prototype.getTileY = function(offset) {
    return Math.floor(((this.y + (this.height/2)) / Canvas.scale) +(Canvas.tilesOnHeight / 2) +offset);
};


Player.prototype.draw = function(ctx){
    ctx.drawImage(this.image, Canvas.width / 2, Canvas.height / 2, this.width, this.height);
};
