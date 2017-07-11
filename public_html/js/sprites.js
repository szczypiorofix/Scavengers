var Sprites = {
    player_image: null,
    ladder: null,
    wall_top: null,
    wall_left: null,
    wall_left_top: null,
    wall_left_bottom: null,
    wall_right: null,
    wall_right_top: null,
    wall_right_bottom: null,
    wall_bottom: null,
    wall_center: null,
    wall_image0: null,
    wall_image1: null,
    wall_image2: null,
    candle1: null,
    rock1: null,
    scenery: null,
    
    newSprite: function(s, n) {
        s = new Image();
        s.src = n;
        return s;
    },
    init: function() {
        this.player_image = this.newSprite(this.player_image, './images/player.png');
        this.wall_image0 = this.newSprite(this.wall_image0, './images/wall0.png');
        this.wall_image1 = this.newSprite(this.wall_image1, './images/wall1.png');
        this.wall_image2 = this.newSprite(this.wall_image2, './images/wall2.png');
        this.candle1 = this.newSprite(this.candle1, './images/candle1.png');
        this.rock1 = this.newSprite(this.rock1, './images/rock1.png');
        this.wall_center = this.newSprite(this.wall_center, './images/wall_center.png');
        this.wall_top = this.newSprite(this.wall_top, './images/wall_top.png');
        this.wall_left = this.newSprite(this.wall_left, './images/wall_left.png');
        this.wall_right = this.newSprite(this.wall_right, './images/wall_right.png');
        this.wall_bottom = this.newSprite(this.wall_bottom, './images/wall_bottom.png');
        this.wall_left_top = this.newSprite(this.wall_left_top, './images/wall_left_top.png');
        this.wall_left_bottom = this.newSprite(this.wall_left_bottom, './images/wall_left_bottom.png');
        this.wall_right_top = this.newSprite(this.wall_right_top, './images/wall_right_top.png');
        this.wall_right_bottom = this.newSprite(this.wall_right_bottom, './images/wall_right_bottom.png');
        this.ladder = this.newSprite(this.ladder, './images/ladder.png');
        this.scenery = this.newSprite(this.scenery, './images/scenery.png');
    }
};
