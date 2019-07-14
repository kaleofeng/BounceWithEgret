
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
        const cm12 = new p2.ContactMaterial(m1, m2, <p2.ContactMaterialOptions>{restitution: 0.7, friction: 0});
        this.world.addContactMaterial(cm12);

        const m3 = new p2.Material(Constant.GROUND_MATERIAL);
        const cm13 = new p2.ContactMaterial(m1, m3, <p2.ContactMaterialOptions>{restitution: 0, friction: 0});
        this.world.addContactMaterial(cm13);
    }

    public tick(dt: number) {
        this.world.step(dt);
    }

    public theWorld(): p2.World {
        return this.world;
    }
}
