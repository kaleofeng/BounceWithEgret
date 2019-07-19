
class PhysicsWorld {

    private world: p2.World;

    constructor() {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 200];
    }

    public setup() {
        const m1 = new p2.Material(Constant.BALL_MATERIAL);
        const m2 = new p2.Material(Constant.BRICK_MATERIAL);
        const m3 = new p2.Material(Constant.GROUND_MATERIAL);

        const cm11 = new p2.ContactMaterial(m1, m1, <p2.ContactMaterialOptions>{restitution: 0.7, friction: 0});
        this.world.addContactMaterial(cm11);

        const cm12 = new p2.ContactMaterial(m1, m2, <p2.ContactMaterialOptions>{restitution: 0.7, friction: 0});
        this.world.addContactMaterial(cm12);

        const cm13 = new p2.ContactMaterial(m1, m3, <p2.ContactMaterialOptions>{restitution: 0, friction: 0});
        this.world.addContactMaterial(cm13);

        this.world.on("beginContact", this.onBeginContact);
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
            ball.theBody().mass = 1;

            switch (role2.role) {
                case ERole.BALL:
                    const another: Ball = <Ball>role1;
                    this.onBallHit(ball, another);
                    break
            }
        }
    }

    private onBallHit(self: Ball, another: Ball) {

    }
}
