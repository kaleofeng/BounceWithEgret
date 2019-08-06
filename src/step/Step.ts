
class Step {

    protected step: EStep;
    protected world: GameWorld;

    constructor(step: EStep) {
        this.step = step;
    }

    public reset(world: GameWorld) {
        this.world = world;
    }

    public onTouchBegin(x: number, y: number) {
        
    }
    
    public onTouchMove(x: number, y: number) {
        
    }
    
    public onTouchEnd(x: number, y: number) {
        
    }
    
    public onTouchTap(x: number, y: number) {

    }
}
