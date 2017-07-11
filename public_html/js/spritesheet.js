var SpriteSheet = function(spr) {
    this.spritewidth = spr.width;
    this.spriteheight = spr.height;
    this.spritesheet = new Image();
    this.spritesheet.src = spr.filename;
    
    this.drawSprite = function(ctx, img) {
        ctx.drawImage(this.spritesheet,
        img.row * this.spritewidth,
        img.col * this.spriteheight,
        this.spritewidth / 3,
        this.spriteheight / 3,
        img.x,
        img.y,
        16 * Canvas.scale,
        16 * Canvas.scale);
    };
};
