
class StepNothing extends Step {

    private static instance = new StepNothing();

    constructor() {
        super(EStep.NOTHING)
    }
    
    public static Instance() {
        return this.instance;
    }
}
