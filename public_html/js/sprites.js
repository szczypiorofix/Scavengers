var Sprites = {
    player_image: null,
    scenery: null,
    groundSheet: null,
    wallSheet: null,
    resourcesSheet: null,
    
    newSprite: function(s, n) {
        s = new Image();
        s.src = n;
        return s;
    },
    init: function() {
        this.player_image = this.newSprite(this.player_image, './images/player.png');
        this.scenery = this.newSprite(this.scenery, './images/scenery.png');
        
        this.groundSheet = new SpriteSheet({
            width: 16, height: 16, rows: 3, cols: 3, filename: './images/groundsheet.png'
        });
        this.wallSheet = new SpriteSheet({
            width: 16, height: 16, rows: 3, cols: 3, filename: './images/wallsheet.png'
        });
        this.resourcesSheet = new SpriteSheet({
            width: 16, height: 16, rows: 3, cols: 3, filename: './images/resourcessheet.png'
        });
    },
    drawSprite: function(ctx, spr, params) {
        spr.drawSprite(ctx, params);
    }
};
