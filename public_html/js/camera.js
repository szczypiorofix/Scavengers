function Camera(x, y) {
    this.x = x;
    this.y = y;
}

Camera.prototype.update = function(player){
    this.x = player.x - (Canvas.width /2);
    this.y = player.y - (Canvas.height / 2);
};
