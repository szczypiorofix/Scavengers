var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Engine = /** @class */ (function () {
    function Engine() {
        console.log("Only one instance!");
    }
    Engine.getInstance = function () {
        if (this.instance == null)
            this.instance = new Engine();
        return this.instance;
    };
    Engine.instance = null;
    return Engine;
}());
var SpriteSheet = /** @class */ (function () {
    function SpriteSheet(name, tileWidth, tileHeight) {
        var _this = this;
        this.width = 0;
        this.height = 0;
        this.name = name;
        this.loadImage().then(function () { return _this.debug("Załadowano obraz poprawnie."); })["catch"](function () { return _this.debug("Błąd! Nie załadowanu obrazu!"); });
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    SpriteSheet.prototype.debug = function (s) {
        console.log("DEBUG: " + s);
    };
    SpriteSheet.prototype.loadImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.image = new Image();
            _this.image.addEventListener('load', function () { return resolve(_this.debug); });
            _this.image.addEventListener('error', function () { return reject(_this.debug); });
            _this.image.src = _this.name;
        });
    };
    SpriteSheet.prototype.getImage = function () {
        return this.image;
    };
    SpriteSheet.prototype.getName = function () {
        return this.name;
    };
    SpriteSheet.prototype.getTileWidth = function () {
        return this.tileWidth;
    };
    SpriteSheet.prototype.getTileHeight = function () {
        return this.tileHeight;
    };
    SpriteSheet.prototype.getWidth = function () {
        return this.width;
    };
    SpriteSheet.prototype.getHeight = function () {
        return this.height;
    };
    return SpriteSheet;
}());
/**
 * Input manager class
 */
var Input = /** @class */ (function () {
    function Input() {
        this.keyLeft = this.prepareKey(37); // LEFT ARROW
        this.keyRight = this.prepareKey(39); // RIGHT ARROW
        this.keyUp = this.prepareKey(38); // UP ARROW
        this.keyDown = this.prepareKey(40); // DOWN ARROW
        this.keyW = this.prepareKey(87); // W KEY
        this.keyS = this.prepareKey(83); // S KEY
        this.keyD = this.prepareKey(68); // D KEY
        this.keyA = this.prepareKey(65); // A KEY
    }
    Input.prototype.prepareKey = function (keyCode) {
        var key = {
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
                // event.preventDefault();
            },
            upHandler: function (event) {
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release)
                        key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                // event.preventDefault();
            }
        };
        window.addEventListener("keydown", key.downHandler.bind(key), false);
        window.addEventListener("keyup", key.upHandler.bind(key), false);
        return key;
    };
    return Input;
}());
/**
 * Canvas main class
 */
var Canvas = /** @class */ (function () {
    /**
     * Main Canvas constructor
     * @param elementId - HTML Element id
     */
    function Canvas(elementId) {
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
        console.log("Canvas prepared. Width: " + this.width + ", height: " + this.height + ". Scale: " + this.scale);
        this.fps = 0;
        this.fpsCounter = 0;
        this.mTimer = 0;
        this.keyInput = new Input();
        this.playerSpriteSheet = new SpriteSheet("./res/images/characters.png", 16, 16);
        this.gameLoop();
    }
    Canvas.prototype.render = function () {
        // this.ctx.drawImage(this.image, this.px, this.py, 64, 64);
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.font = "30px Arial";
        // this.ctx.fillText("Hello World", this.px, 50);
    };
    Canvas.prototype.input = function () {
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
    };
    Canvas.prototype.update = function () {
    };
    Canvas.prototype.gameLoop = function () {
        var _this = this;
        this.input();
        this.update();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.render();
        window.requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Canvas;
}());
document.addEventListener('DOMContentLoaded', function () {
    console.log(Engine.getInstance());
    console.log(Engine.getInstance());
    console.log(Engine.getInstance());
    var canvas = new Canvas('gamecanvas');
}, false);
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2d.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
    };
    Vector2d.prototype.set = function (vec) {
        this.x = vec.x;
        this.y = vec.y;
    };
    return Vector2d;
}());
var GameObject = /** @class */ (function () {
    function GameObject() {
    }
    return GameObject;
}());
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map