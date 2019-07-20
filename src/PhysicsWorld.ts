
class PhysicsWorld {

    private world: p2.World;

    constructor() {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 200];
    }

    public setup() {
        const mA = new p2.Material(Constant.BALL_MATERIAL);
        const mR = new p2.Material(Constant.BRICK_MATERIAL);
        const mW = new p2.Material(Constant.WALL_MATERIAL);
        const mG = new p2.Material(Constant.GROUND_MATERIAL);

        const cmAR = new p2.ContactMaterial(mA, mR, <p2.ContactMaterialOptions>{restitution: 1, friction: 0});
        this.world.addContactMaterial(cmAR);

        const cmAW = new p2.ContactMaterial(mA, mW, <p2.ContactMaterialOptions>{restitution: 1, friction: 0});
        this.world.addContactMaterial(cmAW);

        const cmAG = new p2.ContactMaterial(mA, mG, <p2.ContactMaterialOptions>{restitution: 0, friction: 0});
        this.world.addContactMaterial(cmAG);

        this.world.on("beginContact", this.onBeginContact.bind(this));
    }

    public tick(dt: number) {
        this.world.step(dt);
    }

    public theWorld(): p2.World {
        return this.world;
    }

    private onBeginContact(evt: any) {
        const bodyA: p2.Body = evt.bodyA;
        const bodyB: p2.Body = evt.bodyB;
        const body1 = bodyA.userData.role <= bodyB.userData.role ? bodyA : bodyB;
        const body2 = bodyA.userData.role <= bodyB.userData.role ? bodyB : bodyA;
        const role1 = body1.userData;
        const role2 = body2.userData;
        
        if (role1.role == ERole.BALL) {
            const ball: Ball = <Ball>role1;
            if (ball.theBody().mass == 0) {
                ball.theBody().mass = 200;
                let impulse: number[] = [ball.theBody().velocity[0], ball.theBody().velocity[1]];

                console.log("accelerate", ball.theBody().id, ball.theBody().velocity[0], ball.theBody().velocity[1]);
            }

            switch (role2.role) {
                case ERole.BRICK:
                    this.onBallHitBrick(ball, <Brick>role2);
                    break
                case ERole.WALL:
                    this.onBallHitWall(ball, <Wall>role2);
                    break
                case ERole.GROUND:
                    this.onBallHitGround(ball, <Ground>role2);
                    break
                default:
                    console.log("Ball hit unknown role", role2.role);
            }
        }
    }

    private onBallHitBrick(ball: Ball, brick: Brick) {
        console.log("hit brick", ball.theBody().id, ball.theBody().velocity[0], ball.theBody().velocity[1]);
    }
    
    private onBallHitWall(ball: Ball, wall: Wall) {
        //console.log("hit wall", ball.theBody().id, ball.theBody().velocity[0], ball.theBody().velocity[1]);
    }
    
    private onBallHitGround(ball: Ball, ground: Ground) {
        //console.log("hit ground", ball.theBody().id, ball.theBody().velocity[0], ball.theBody().velocity[1]);
    }
}
