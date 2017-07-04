    let gameManager = null;
    
//    let ViewPort = {
//        width: 0,
//        height: 0,
//        fieldsOnX: 20,
//        fieldsOnY: 16,
//        fieldWidth: 0,
//        fieldHeight: 0,
//        fields: [],
//        
//        init: function(cw, ch) {
//            this.width = cw;
//            this.height = ch;
//            this.fieldWidth = this.width / this.fieldsOnX;
//            this.fieldHeight = this.height / this.fieldsOnY;
//        },
//        update: function() {
//            this.width = Canvas.width;
//            this.height = Canvas.height;
//            this.fieldWidth = this.width / this.fieldsOnX;
//            this.fieldHeight = this.height / this.fieldsOnY;
//            console.log('View port size update: '+this.fieldWidth+":"+this.fieldHeight);
//        }
//    };
    
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
                self.canvas.width = window.innerWidth;
                self.canvas.height = window.innerHeight;
                self.width = self.canvas.width;
                self.height = self.canvas.height;
                
                //ViewPort.update();
                //console.log('Canvas resize: '+self.width+":"+self.height);
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

//        ViewPort.init(Canvas.width, Canvas.height);
//        
//        console.log('ViewPort initialized: '+ViewPort.width+":" +ViewPort.height);
//        console.log('ViewPort fields: '+ViewPort.fieldsOnX+":" +ViewPort.fieldsOnY);
//        console.log('ViewPort field size: '+ViewPort.fieldWidth+":" +ViewPort.fieldHeight);
        
        gameManager = new GameManager();
        gameManager.init();
        gameManager.loadLevel(1);
        
        requestAnimationFrame(game);
        
    }, false);

