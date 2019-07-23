
class GameScene extends egret.DisplayObjectContainer {

    private gameWorld: GameWorld;
    private p2DebugDraw: p2DebugDraw;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.setup();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private setup() {
        this.gameWorld = new GameWorld();
        this.gameWorld.setup(this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(this.gameWorld);

        // this.p2DebugDraw = new p2DebugDraw(this.physicsWorld);
        // const debugSprite = new egret.Sprite();
        // this.addChild(debugSprite);
        // this.p2DebugDraw.setSprite(debugSprite);

        egret.startTick(this.tick, this);
    }

    private tick(timestamp: number): boolean {
        return this.gameWorld.tick();
    }

    private onTouchTap(evt: egret.TouchEvent) {
        this.gameWorld.onTouchTap(evt.stageX, evt.stageY);
    }
}
