
class StepFire extends Step {

    private static instance = new StepFire();

    constructor() {
        super(EStep.FIRE)
    }

    public static Instance() {
        return this.instance;
    }
    
    public onTouchBegin(x: number, y: number) {
        this.world.gun.updateDirection(x, y);

        const bulletPostion = this.world.gun.getBulletPostion();
        this.world.guideLine.updatePosition(bulletPostion[0], bulletPostion[1]);
        this.world.guideLine.updateDirection(x, y);
        this.world.guideLine.show();
    }

    public onTouchMove(x: number, y: number) {
        this.world.gun.updateDirection(x, y);
        
        const bulletPostion = this.world.gun.getBulletPostion();
        this.world.guideLine.updatePosition(bulletPostion[0], bulletPostion[1]);
        this.world.guideLine.updateDirection(x, y);
    }

    public onTouchEnd(x: number, y: number) {
        this.world.guideLine.hide();
    }
    
    public onTouchTap(x: number, y: number) {
        this.world.fireBall();
        this.world.switchStep(StepBaffle.Instance());
    }
}
