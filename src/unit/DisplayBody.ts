
class DisplayBody {

    protected type: number;
    protected mass: number;
    protected width: number;
    protected height: number;

    public body: p2.Body;
    public display: egret.DisplayObjectContainer;
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

    public anchorRatio(): number[] {
        return [0, 0];
    }

    protected createBody() {

    }

    protected createDisplay() {

    }

    protected createShape() {

    }
}
