
class Ball extends egret.Sprite {

    private options: any;

    private material: p2.Material;
    private body: p2.Body;
    private shape: p2.Circle;

    constructor(options: any) {
        super();

        this.options = options;
        this.setup();
    }

    public setup() {
        this.createMaterial();
        this.createBody();
        this.createShape();
        this.createDisplay();
    }

    public theMaterial(): p2.Material {
        return this.material;
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public theShape(): p2.Circle {
        return this.shape;
    }

    private createMaterial() {
        this.material = new p2.Material(Constant.BALL_MATERIAL);
    }

    private createBody() {
        const position: number[] = OptionHelper.getOptionPosition(this.options);
        const mass: number = OptionHelper.getOptionMass(this.options);

        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
    }

    private createShape() {
        const radius: number = OptionHelper.getOptionRadius(this.options);

        this.shape = new p2.Circle({radius: radius});
        this.shape.material = this.material;
        this.body.addShape(this.shape);
    }

    private createDisplay() {
        const radius: number = OptionHelper.getOptionRadius(this.options);
        const color: number = OptionHelper.getOptionColor(this.options);
        const alpha: number = OptionHelper.getOptionAlpha(this.options);

        this.anchorOffsetX = radius;
        this.anchorOffsetY = radius;
        this.graphics.beginFill(color, alpha);
        this.graphics.drawCircle(this.anchorOffsetX, this.anchorOffsetY, radius);
        this.graphics.endFill();
        this.body.displays = [this];
    }
}
