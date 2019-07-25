
class Wall extends Role {

    constructor(options: any) {
        super(ERole.WALL, options);
    }
    
    protected createDisplayBody() {
        this.displayBody = new GraphicsBox(this.options);
        this.displayBody.setup();
        this.displayBody.body.userData = this;
        this.displayBody.shape.material = new p2.Material(Constant.WALL_MATERIAL);
        this.displayBody.shape.collisionGroup = Constant.WALL_COLLISION_GROUP;
        this.displayBody.shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }
}
