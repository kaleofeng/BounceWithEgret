
class Brick extends egret.Sprite {

    protected options: any;

    protected material: p2.Material;
    protected body: p2.Body;
    protected shape: p2.Box;

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

    public theShape(): p2.Box {
        return this.shape;
    }

    public theBody(): p2.Body {
        return this.body;
    }

    protected createMaterial() {
        this.material = new p2.Material(Constant.BRICK_MATERIAL);
    }

    protected createBody() {
        const position: number[] = this.options.position !== undefined ? this.options.position : [0, 0];
        const mass: number = this.options.mass !== undefined ? this.options.mass : 1;
    
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
    }

    protected createShape() {

    }

    protected createDisplay() {

    }
}
