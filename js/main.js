class Input {
    constructor() {
        this.keyLeft = this.prepareKey(37); // LEFT ARROW
        this.keyRight = this.prepareKey(39); // RIGHT ARROW
        this.keyUp = this.prepareKey(38); // UP ARROW
        this.keyDown = this.prepareKey(40); // DOWN ARROW
        this.keyW = this.prepareKey(87); // W KEY
        this.keyS = this.prepareKey(83); // S KEY
        this.keyD = this.prepareKey(68); // D KEY
        this.keyA = this.prepareKey(65); // A KEY
    }
    prepareKey(keyCode) {
        let key = {
            code: keyCode,
            isDown: false,
            isUp: true,
            press: null,
            release: null,
            downHandler: function (event) {
                if (event.keyCode === key.code) {
                    if (key.isUp && key.press) {
                        key.press();
                    }
                    key.isDown = true;
                    key.isUp = false;
                }
                event.preventDefault();
            },
            upHandler: function (event) {
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release)
                        key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                event.preventDefault();
            }
        };
        window.addEventListener("keydown", key.downHandler.bind(key), false);
        window.addEventListener("keyup", key.upHandler.bind(key), false);
        return key;
    }
}
/**
 * Canvas main class
 */
class Canvas {
    /**
     * Main Canvas constructor
     * @param elementId - HTML Element id
     */
    constructor(elementId) {
        this.canvas = null;
        this.ctx = null;
        this.canvas = document.getElementById(elementId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scale = this.width / this.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = "#e41";
        this.image = new Image();
        this.image.src = "images/player.png";
        console.log("Canvas prepared. Width: " + this.width + ", height: " + this.height + ". Scale: " + this.scale);
        this.px = 100;
        this.py = 150;
        this.pSpeed = 5;
        this.keyInput = new Input();
        this.gameLoop();
    }
    render() {
        this.ctx.drawImage(this.image, this.px, this.py, 64, 64);
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.font = "30px Arial";
        // this.ctx.fillText("Hello World", this.px, 50);
    }
    input() {
        if (this.keyInput.keyDown.isDown == true || this.keyInput.keyS.isDown == true) {
            this.py += this.pSpeed;
        }
        if (this.keyInput.keyUp.isDown == true || this.keyInput.keyW.isDown == true) {
            this.py -= this.pSpeed;
        }
        if (this.keyInput.keyRight.isDown == true || this.keyInput.keyD.isDown == true) {
            this.px += this.pSpeed;
        }
        if (this.keyInput.keyLeft.isDown == true || this.keyInput.keyA.isDown == true) {
            this.px -= this.pSpeed;
        }
    }
    update() {
    }
    countFPS() {
        if (!this.lastCalledTime) {
            this.lastCalledTime = Date.now();
            this.fps = 0;
            return;
        }
        this.delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        if (this.fpsCounter >= 3) {
            this.fps = Math.round((1 / this.delta));
            this.fpsCounter = 0;
        }
        this.fpsCounter++;
        return this.fps;
    }
    gameLoop() {
        this.input();
        this.update();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.render();
        window.requestAnimationFrame(() => this.gameLoop());
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let canvas = new Canvas('gamecanvas');
}, false);
//# sourceMappingURL=main.js.map