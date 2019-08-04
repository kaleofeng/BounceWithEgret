
class GameScene extends egret.DisplayObjectContainer {

    private gameWorld: GameWorld;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.setup();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private setup() {
        this.gameWorld = new GameWorld();
        this.gameWorld.setup(this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(this.gameWorld);

        egret.startTick(this.tick, this);
    }

    private tick(timestamp: number): boolean {
        return this.gameWorld.tick(timestamp);
    }

    private onTouchTap(evt: egret.TouchEvent) {
        this.gameWorld.onTouchTap(evt.stageX, evt.stageY);
    }
    
    private onTouchBegin(evt: egret.TouchEvent) {
        this.gameWorld.onTouchBegin(evt.stageX, evt.stageY);
    }
    
    private onTouchMove(evt: egret.TouchEvent) {
        this.gameWorld.onTouchMove(evt.stageX, evt.stageY);
    }
    
    private onTouchEnd(evt: egret.TouchEvent) {
        this.gameWorld.onTouchEnd(evt.stageX, evt.stageY);
    }
}
