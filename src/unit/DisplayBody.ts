
class DisplayBody {

    protected type: number;
    protected mass: number;
    protected width: number;
    protected height: number;

    public body: p2.Body;
    public skin: egret.DisplayObject;
    public shape: p2.Shape;

    constructor(options: any) {
        this.type = OptionHelper.type(options);
        this.mass = OptionHelper.mass(options);
        this.width = OptionHelper.width(options);
        this.height = OptionHelper.height(options);
    }

    public setup() {
        this.createBody();
        this.createDisplay();
        this.createShape();
    }

    protected createBody() {

    }

    protected createDisplay() {

    }

    protected createShape() {

    }
}
