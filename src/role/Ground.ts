
class Ground extends Role {

    constructor(options: any) {
        super(ERole.GROUND, options);
    }

    protected createDisplayBody() {
        this.displayBody = new GraphicsTriangle(this.options);
        this.displayBody.setup();
        this.displayBody.body.userData = this;
        this.displayBody.shape.material = new p2.Material(Constant.GROUND_MATERIAL);
        this.displayBody.shape.collisionGroup = Constant.GROUND_COLLISION_GROUP;
        this.displayBody.shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }
}
