
class SpriteSheet {
    private width:number;
    private height:number;
    private name:string;
    private tileWidth:number;
    private tileHeight:number;
    private image:CanvasImageSource;


    public constructor(name:string, tileWidth:number, tileHeight:number) {
        this.width = 0;
        this.height = 0;
        this.name = name;

        this.loadImage().then(
            () => this.debug("Załadowano obraz poprawnie.")
        ).catch(
            () => this.debug("Błąd! Nie załadowanu obrazu!")
        );
        
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    
    private debug(s:string) {
        console.log("DEBUG: "+s);
    }


    private loadImage() {
        return new Promise((resolve, reject) => {
            this.image = new Image();
            this.image.addEventListener('load', () => resolve( this.debug) );
            this.image.addEventListener('error', () => reject( this.debug) );
            this.image.src = this.name;
        });
    }

    public getImage():CanvasImageSource {
        return this.image;
    }

    public getName():string {
        return this.name;
    }

    public getTileWidth():number {
        return this.tileWidth;
    }
    
    public getTileHeight():number {
        return this.tileHeight;
    }

    public getWidth():number {
        return this.width;
    }

    public getHeight():number {
        return this.height;
    }

}
