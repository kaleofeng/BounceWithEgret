
class PhysicsWorld {

    private world: p2.World;

    constructor() {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 500];
        this.world.applyDamping = false;
    }

    public setup() {
        const mA = new p2.Material(Constant.BALL_MATERIAL);
        const mR = new p2.Material(Constant.BRICK_MATERIAL);
        const mW = new p2.Material(Constant.WALL_MATERIAL);
        const mF = new p2.Material(Constant.BAFFLE_MATERIAL);
        const mG = new p2.Material(Constant.GROUND_MATERIAL);

        const cmAR = new p2.ContactMaterial(mA, mR, <p2.ContactMaterialOptions>{restitution: 0.8, friction: 0});
        this.world.addContactMaterial(cmAR);

        const cmAW = new p2.ContactMaterial(mA, mW, <p2.ContactMaterialOptions>{restitution: 1, friction: 0});
        this.world.addContactMaterial(cmAW);

        const cmAF = new p2.ContactMaterial(mA, mF, <p2.ContactMaterialOptions>{restitution: 1, friction: 0});
        this.world.addContactMaterial(cmAF);

        const cmAG = new p2.ContactMaterial(mA, mG, <p2.ContactMaterialOptions>{restitution: 0, friction: 0});
        this.world.addContactMaterial(cmAG);

        this.world.on("beginContact", this.onBeginContact.bind(this));
    }

    public tick(dt: number) {
        this.world.step(dt);

        const bodies = this.world.bodies;
        for (const body of bodies) {
            const role = <Role>body.userData;
            role.sync();
        }
    }

    public addBody(body: p2.Body) {
        this.world.addBody(body);
    }

    public removeBody(body: p2.Body) {
        this.world.removeBody(body);
    }

    private onBeginContact(evt: any) {
        const bodyA: p2.Body = evt.bodyA;
        const bodyB: p2.Body = evt.bodyB;
        const body1 = bodyA.userData.getType() <= bodyB.userData.getType() ? bodyA : bodyB;
        const body2 = bodyA.userData.getType() <= bodyB.userData.getType() ? bodyB : bodyA;
        const role1 = body1.userData;
        const role2 = body2.userData;

        const role1Type = role1.getType();
        switch (role1Type) {
            case ERole.BALL:
                this.onBallContact(role1, role2);
                break;
            case ERole.BRICK:
                this.onBrickContact(role1, role2);
                break;
            default:
                break;
        }
    }

    private onBallContact(role1: any, role2: any) {
        const ball: Ball = <Ball>role1;

        if (ball.getState() <= EBallState.BORN) {
            ball.setState(EBallState.DATING);

            ball.body().mass = 1;
            ball.body().updateMassProperties();
        }

        switch (role2.getType()) {
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

    private onBrickContact(role1: any, role2: any) {
        const brick: Brick = <Brick>role1;
    }

    private onBallHitBrick(ball: Ball, brick: Brick) {
        brick.body().angularVelocity = 0;

        const yOrigin = brick.body().position[1];
        egret.Tween.get(brick.display()).to({y: yOrigin + 2}, 100).to({y: yOrigin - 2}, 100);

        brick.decNumber();

        if (ball.getVelocityPower() < 100) {
            ball.applyImpulse([250, -500]);
        }
        
        SoundManager.play(SoundManager.HIT);
    }
    
    private onBallHitWall(ball: Ball, wall: Wall) {
    
    }
    
    private onBallHitGround(ball: Ball, ground: Ground) {
        //SoundManager.play(SoundManager.FLOOR);
    }
}
