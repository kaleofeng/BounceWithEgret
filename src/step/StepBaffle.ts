
class StepBaffle extends Step {
    
    private static instance = new StepBaffle();

    private baffleLine: egret.Sprite;
    private beginPosition: number[];
    private endPosition: number[];
    
    constructor() {
        super(EStep.BAFFLE)
    }

    public static Instance() {
        return this.instance;
    }

    public onTouchBegin(x: number, y: number) {
        this.beginPosition = [x, y];
    }

    public onTouchMove(x: number, y: number) {
        this.endPosition = [x, y];

        this.clearBaffleLine();
        if (this.isOnDeck(this.beginPosition) && this.isOnDeck(this.endPosition)) {
            this.drawBaffleLine();
        }
    }

    public onTouchEnd(x: number, y: number) {
        this.endPosition = [x, y];

        this.clearBaffleLine();
        if (this.isOnDeck(this.beginPosition) && this.isOnDeck(this.endPosition)) {
            this.createBaffle();
        }
    }
    
    private createBaffle() {
        const beginPos = this.beginPosition;
        const endPos = this.endPosition;
        const angle = MathHelper.calAxisAngle(endPos[0] - beginPos[0], endPos[1] - beginPos[1]);

        const baffleWidth = WorldHelper.baffleWidth();
        const baffleHeight = WorldHelper.baffleHeight();
        const offsetX = baffleHeight * Math.sin(angle) / 2;
        const offsetY = baffleHeight * Math.cos(angle) / 2;
        const centerPos = [beginPos[0] + offsetX, beginPos[1] + offsetY];

        const baffle = RoleHelper.createBaffle(WorldHelper.baffleWidth(), WorldHelper.baffleHeight());
        this.world.addBaffle(baffle);

        baffle.body().position = centerPos;
        baffle.body().angle = -angle;
    }

    private drawBaffleLine() {
        this.baffleLine = new egret.Sprite();
        this.baffleLine.graphics.clear();
        this.baffleLine.graphics.lineStyle(4, 0x00FF00);
        this.baffleLine.graphics.moveTo(this.beginPosition[0], this.beginPosition[1]);
        this.baffleLine.graphics.lineTo(this.endPosition[0], this.endPosition[1]);
        this.world.addChild(this.baffleLine);
    }

    private clearBaffleLine() {
        if (this.baffleLine !== undefined) {
            this.world.removeChild(this.baffleLine);
            this.baffleLine = undefined;
        }
    }
    
    private isOnDeck(postion: number[]) {
        const leftX = WorldHelper.tunnelWidth() + WorldHelper.wallWidth() + WorldHelper.baffleWidth();
        const rightX = WorldHelper.stageWidth() - leftX;
        const topY = WorldHelper.roofHeight() + this.world.gun.height;
        const bottomY = WorldHelper.stageHeight() - this.world.ground.display().height - WorldHelper.baffleWidth();
        return postion[0] > leftX && postion[0] < rightX && postion[1] > topY && postion[1] < bottomY;
    }
}
