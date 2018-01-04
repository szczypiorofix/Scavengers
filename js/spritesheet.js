var SpriteSheet = function(spr) {
    this.spritewidth = spr.width;
    this.spriteheight = spr.height;
    this.rows = spr.rows;
    this.cols = spr.cols;
    this.spritesheet = new Image();
    this.spritesheet.src = spr.filename;
    
    this.drawSprite = function(ctx, img) {
        ctx.drawImage(this.spritesheet,
        img.row * this.spritewidth,
        img.col * this.spriteheight,
        this.spritewidth,
        this.spriteheight,
        img.x,
        img.y,
        Canvas.scale,
        Canvas.scale);
    };
};
