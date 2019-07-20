
class Ball extends egret.Bitmap {

    private options: any;
    private role: ERole;

    private body: p2.Body;
    private shape: p2.Circle;

    constructor(options: any) {
        super();

        this.options = options;
        this.role = ERole.BALL;
        this.setup();
    }

    public setup() {
        this.createBody();
        this.createDisplay();
        this.createShape();
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public theShape(): p2.Circle {
        return this.shape;
    }

    private createBody() {
        const position: number[] = OptionHelper.getOptionPosition(this.options);
        const mass: number = OptionHelper.getOptionMass(this.options);

        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
        this.body.userData = this;
    }

    private createDisplay() {
        this.texture = RES.getRes("ball_png");
        this.anchorOffsetX = this.texture.textureWidth / 2;
        this.anchorOffsetY = this.texture.textureHeight / 2;
        this.body.displays = [this];
    }

    private createShape() {
        this.shape = new p2.Circle({radius: this.texture.textureWidth / 2});
        this.shape.material = new p2.Material(Constant.BALL_MATERIAL);
        this.shape.collisionGroup = Constant.BALL_COLLISION_GROUP;
        this.shape.collisionMask = Constant.BRICK_COLLISION_GROUP | Constant.WALL_COLLISION_GROUP | Constant.GROUND_COLLISION_GROUP;
        this.body.addShape(this.shape);
    }
}
