function EmptyObject(image, x, y, width, height) {
    GameObject.call(this, image, x, y, width, height);
}

EmptyObject.prototype = Object.create(GameObject.prototype);
EmptyObject.prototype.constructor = EmptyObject;


EmptyObject.prototype.update = function(){
};

EmptyObject.prototype.draw = function(ctx, offsetX, offsetY){
};


