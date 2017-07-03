
function Player(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function(){
    this.x += this.speedX;
    this.y += this.speedY;
};

Player.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x, this.y, this.width * this.scale, this.height * this.scale);
};
