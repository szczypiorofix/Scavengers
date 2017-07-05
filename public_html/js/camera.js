function Camera(x, y) {
    this.x = x;
    this.y = y;
}

Camera.prototype.update = function(player, gamemanager){
    if (player.getTileX(0) >= gamemanager.fieldsToLeft-1 && player.getTileX(0) < gamemanager.background[0].length -gamemanager.fieldsToRight +2) {
        this.x = player.x - (Canvas.width /2);
    }
    if (player.getTileY(0) >= gamemanager.fieldsToTop-1 && player.getTileY(0) < gamemanager.background.length -gamemanager.fieldsToBottom +2) {
        this.y = player.y - (Canvas.height / 2);
    }
};
