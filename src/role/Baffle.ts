
class Baffle extends Role {

    constructor(options: any) {
        super(ERole.BAFFLE, options);
    }

    public setup() {
        this.createDisplayBody();
    }

    protected createDisplayBody() {
        this.displayBody = new GraphicsBox(this.options);
        
        this.displayBody.setup();
        this.displayBody.body.userData = this;
        this.displayBody.shape.material = new p2.Material(Constant.BAFFLE_MATERIAL);
        this.displayBody.shape.collisionGroup = Constant.BAFFLE_COLLISION_GROUP;
        this.displayBody.shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }
}
