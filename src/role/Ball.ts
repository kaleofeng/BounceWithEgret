
class Ball extends Role {

    private state: EBallState;

    constructor(options: any) {
        super(ERole.BALL, options);
        this.state = EBallState.BORN;
    }

    public getState(): EBallState {
        return this.state;
    }

    public setState(state: EBallState) {
        this.state = state;
    }

    public getVelocityPower(): number {
        return MathHelper.calVelocityPower(this.displayBody.body.velocity);
    }

    public applyImpulse(impuse: number[]) {
        this.displayBody.body.applyImpulse(impuse, [0, 0]);
    }

    public applyImpulseByPower(power: number) {
        const velocity = this.displayBody.body.velocity;
        const impuse = MathHelper.calAxisDivide(velocity[0], velocity[1], power);
        this.displayBody.body.applyImpulse(impuse, [0, 0]);
    }
    
    protected createDisplayBody() {
        this.displayBody = new ImageCircle(this.options);
        this.displayBody.setup();
        this.displayBody.body.userData = this;
        this.displayBody.shape.material = new p2.Material(Constant.BALL_MATERIAL);
        this.displayBody.shape.collisionGroup = Constant.BALL_COLLISION_GROUP;
        this.displayBody.shape.collisionMask = Constant.BRICK_COLLISION_GROUP | Constant.WALL_COLLISION_GROUP | Constant.BAFFLE_COLLISION_GROUP | Constant.GROUND_COLLISION_GROUP;
    }
}
