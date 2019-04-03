
class Vector2d {

    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public add(vec:Vector2d) {
        this.x += vec.x;
        this.y += vec.y;
    }

    public set(vec:Vector2d) {
        this.x = vec.x;
        this.y = vec.y;
    }
}





abstract class GameObject {

    name:string;
    x:number;
    y:number;


}



class Player extends GameObject {
    x:number;
    y:number;
    speed:number;
}
