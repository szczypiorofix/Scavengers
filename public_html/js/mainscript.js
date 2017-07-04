    let gameManager = null;
    
    let Canvas = {
        canvas: null,
        ctx: null,
        width: 0,
        height: 0,
        tilesOnHeight: 16,
        scale: 0,

        init: function() {
            this.canvas = document.getElementById('gamecanvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            
            this.scale = this.height / this.tilesOnHeight;
            console.log('Canvas scale: ' +this.scale);
            this.ctx.msImageSmoothingEnabled = false;
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;
            this.ctx.imageSmoothingEnabled = false;
            
            var self = this;
            window.onresize = function() {
                self.canvas.width = Math.round(window.innerWidth);
                self.canvas.height = Math.round(window.innerHeight);
                self.width = self.canvas.width;
                self.height = self.canvas.height;
                self.scale = self.height / self.tilesOnHeight;
            };
        }
    };
    
    function gameLoop() {
        
        Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        
        gameManager.inputFromKeyboard();
        
        gameManager.update();
        
        gameManager.draw(Canvas.ctx);
    }
    
    function game() {
        gameLoop();

        requestAnimationFrame(game);
    }

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    document.addEventListener('DOMContentLoaded', function() {
        
        Canvas.init();
        console.log('Canvas initialized: '+Canvas.width+":" +Canvas.height);
        
        gameManager = new GameManager();
        gameManager.init();
        gameManager.loadLevel(1);
        
        requestAnimationFrame(game);
        
    }, false);

