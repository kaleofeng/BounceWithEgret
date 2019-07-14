
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
        const position: number[] = this.options.position !== undefined ? this.options.position : [0, 0];
        const radius: number = this.options.radius !== undefined ? this.options.radius : 20;
        const mass: number = this.options.mass !== undefined ? this.options.mass : 1;
        const color: number = this.options.color !== undefined ? this.options.color : 0x0000FF;
        const alpha: number = this.options.alpha !== undefined ? this.options.alpha : 1;

        this.createMaterial();
        this.createBody(position, mass);
        this.createShape(radius);
        this.createDisplay(radius, color, alpha);
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

    private createBody(position: number[], mass: number) {
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
    }

    private createShape(radius: number) {
        this.shape = new p2.Circle({radius: radius});
        this.shape.material = this.material;
        this.body.addShape(this.shape);
    }

    private createDisplay(radius: number, color: number, alpha: number) {
        const radiusBorder: number = Constant.BORDER_THICKNESS / 2;

        this.anchorOffsetX = radius;
        this.anchorOffsetY = radius;
        this.graphics.lineStyle(Constant.BORDER_THICKNESS, 0x00FF00);
        this.graphics.beginFill(color, 1);
        this.graphics.drawCircle(this.anchorOffsetX, this.anchorOffsetY, radius - radiusBorder);
        this.graphics.endFill();
        this.body.displays = [this];
    }
}
