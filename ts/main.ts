
/**
 * Key Properties interface
 */
interface KeyProps {
    code: number,
    isDown: Boolean,
    isUp: Boolean,
    press?: ()=> void,
    release?: ()=> void,
    downHandler?: (event: KeyboardEvent) => void,
    upHandler?: (event: KeyboardEvent) => void
}

/**
 * Input manager class
 */
class Input {
    keyLeft:KeyProps;
    keyRight:KeyProps;
    keyUp:KeyProps;
    keyDown:KeyProps;
    keyW:KeyProps;
    keyS:KeyProps;
    keyD:KeyProps;
    keyA:KeyProps;

    constructor() {
        this.keyLeft  = this.prepareKey(37); // LEFT ARROW
        this.keyRight = this.prepareKey(39); // RIGHT ARROW
        this.keyUp    = this.prepareKey(38); // UP ARROW
        this.keyDown  = this.prepareKey(40); // DOWN ARROW
        this.keyW     = this.prepareKey(87); // W KEY
        this.keyS     = this.prepareKey(83); // S KEY
        this.keyD     = this.prepareKey(68); // D KEY
        this.keyA     = this.prepareKey(65); // A KEY
    }

    private prepareKey(keyCode:number):KeyProps {
        let key:KeyProps = {
            code: keyCode,
            isDown: false,
            isUp: true,
            press: null,
            release: null,
            downHandler: function(event) {
                if (event.keyCode === key.code) {
                    if (key.isUp && key.press) {
                        key.press();
                    }
                    key.isDown = true;
                    key.isUp = false;
                }
                // event.preventDefault();
            },
            upHandler: function(event) {
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release) key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                // event.preventDefault();
            }
        }
        window.addEventListener("keydown", key.downHandler.bind(key), false);
        window.addEventListener("keyup", key.upHandler.bind(key), false);
        return key;
      }
}

/**
 * Canvas main class
 */
class Canvas {

    canvas:HTMLCanvasElement = null;
    ctx:CanvasRenderingContext2D = null;
    width:number;
    height:number;
    tilesOnWidth:number;
    tilesOnHeight:number;
    scale:number;
    fps:number;
    delta:number;
    lastCalledTime:number;
    fpsCounter:number;
    mTimer:number;

    keyInput:Input;
    playerSpriteSheet:SpriteSheet;

    
    /**
     * Main Canvas constructor
     * @param elementId - HTML Element id
     */
    constructor(elementId:string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(elementId);
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scale = this.width / this.height;


        this.ctx.imageSmoothingEnabled = false;
        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = "#e41";

        console.log("Canvas prepared. Width: "+this.width+", height: "+this.height+". Scale: "+this.scale);
        
        this.fps = 0;
        this.fpsCounter = 0;
        this.mTimer = 0;
        
        this.keyInput = new Input();


        this.playerSpriteSheet = new SpriteSheet("./res/images/characters.png", 16, 16);

        this.gameLoop();
    }



    private render() {


        // this.ctx.drawImage(this.image, this.px, this.py, 64, 64);

        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.font = "30px Arial";
        // this.ctx.fillText("Hello World", this.px, 50);
    }

    private input() {
        // if (this.keyInput.keyDown.isDown == true || this.keyInput.keyS.isDown == true) {
        //     this.py += this.pSpeed;
        // }
        // if (this.keyInput.keyUp.isDown == true || this.keyInput.keyW.isDown == true) {
        //     this.py -= this.pSpeed;
        // }
        // if (this.keyInput.keyRight.isDown == true || this.keyInput.keyD.isDown == true) {
        //     this.px += this.pSpeed;
        // }
        // if (this.keyInput.keyLeft.isDown == true || this.keyInput.keyA.isDown == true) {
        //     this.px -= this.pSpeed;
        // }
    }

    private update() {
        
        
    }

    
    private gameLoop() {

        this.input();


        this.update();


        this.ctx.clearRect(0, 0, this.width, this.height);
        this.render();
        


        window.requestAnimationFrame(() => this.gameLoop());
    }


}




document.addEventListener('DOMContentLoaded', function() {

    console.log(Engine.getInstance());
    console.log(Engine.getInstance());
    console.log(Engine.getInstance());

    let canvas = new Canvas('gamecanvas');
}, false);
