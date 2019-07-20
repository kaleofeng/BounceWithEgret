
class Wall extends egret.Sprite {

    private options: any;
    private role: ERole;

    private shape: p2.Box;
    private body: p2.Body;
    private skin: egret.Sprite;

    constructor(options: any) {
        super();
        this.options = options;
        this.role = ERole.WALL;
        this.setup();
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public theShape(): p2.Box {
        return this.shape;
    }

    private setup() {
        this.createBody();
        this.createDisplay();
        this.createShape();
    }

    private createBody() {
        const position: number[] = OptionHelper.getOptionPosition(this.options);
        const mass: number = OptionHelper.getOptionMass(this.options);
    
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.STATIC;
        this.body.userData = this;
    }

    private createDisplay() {
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);
        const color: number = OptionHelper.getOptionColor(this.options);
        const alpha: number = OptionHelper.getOptionAlpha(this.options);

        this.anchorOffsetX = dimension[0] / 2;
        this.anchorOffsetY = dimension[1] / 2;
        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(0, 0, dimension[0], dimension[1]);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    private createShape() {
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);

        this.shape = new p2.Box({width: dimension[0], height: dimension[1]})
        this.shape.material = new p2.Material(Constant.WALL_MATERIAL);
        this.shape.collisionGroup = Constant.WALL_COLLISION_GROUP;
        this.shape.collisionMask = Constant.BALL_COLLISION_GROUP;
        this.body.addShape(this.shape);
    }
}
