
class Engine {

    private static instance:Engine = null;

    private constructor() {
        console.log("Only one instance!");
    }

    public static getInstance():Engine {
        if (this.instance == null) this.instance = new Engine();
        return this.instance;
    }
}
