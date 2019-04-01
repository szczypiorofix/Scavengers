    let gameManager = null;
    
    let Canvas = {
        canvas: null,
        ctx: null,
        width: 0,
        height: 0,
        tilesOnHeight: 12,
        tilesOnWidth: 16,
        scale: 0,
        fps: 0,
        lastCalledTime: 0,
        fpsCounter: 0,

        init: function() {
            this.canvas = document.getElementById('gamecanvas');
            this.ctx = this.canvas.getContext('2d');
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.scale = this.height / this.tilesOnHeight;
            
            console.log('Canvas scale: ' +this.scale);
            this.ctx.msImageSmoothingEnabled = false;
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;
            this.ctx.imageSmoothingEnabled = false;
        },
        countFPS: function() {
                if(!this.lastCalledTime) {
                    this.lastCalledTime = Date.now();
                    this.fps = 0;
                    return;
                }
                delta = (Date.now() - this.lastCalledTime)/1000; 
                this.lastCalledTime = Date.now();
                if (this.fpsCounter >= 3) {
                this.fps = (1/delta).toFixed(1); 
                this.fpsCounter = 0;
            }
            this.fpsCounter++;
            return this.fps;
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
        gameLoopController(game);
    }

    var gameLoopController =
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
        gameLoopController(game);
    }, false);

