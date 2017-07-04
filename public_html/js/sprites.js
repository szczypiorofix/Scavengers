var Sprites = {
    player_image: null,
    ground_image1: null,
    wall_image1: null,
    
    newSprite: function(s, n) {
        s = new Image();
        s.src = n;
        return s;
    },
    init: function() {
        this.player_image = this.newSprite(this.player_image, './images/player.png');
        this.ground_image1 = this.newSprite(this.ground_image1, './images/ground1.png');
        this.wall_image1 = this.newSprite(this.wall_image1, './images/wall1.png');
    }
};
