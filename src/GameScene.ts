
class GameScene extends egret.DisplayObjectContainer {

    private physicsWorld: PhysicsWorld;
    private p2DebugDraw: p2DebugDraw;

    private ground: Box;
    private boxBrick: Brick;
    private circleBrick: Brick;
    private ball: Ball;

    private lastTime: number;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.setup();
        this.touchEnabled = true;
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
    }

    private setup() {
        this.physicsWorld = new PhysicsWorld();
        this.p2DebugDraw = new p2DebugDraw(this.physicsWorld.theWorld());
        this.lastTime = 0;

        this.physicsWorld.setup();
        this.createBackground();
        this.createGround();
        this.createBoxBrick();
        this.createCircleBrick();

        // const debugSprite = new egret.Sprite();
        // this.addChild(debugSprite);
        // this.p2DebugDraw.setSprite(debugSprite);

        egret.startTick(this.tick, this);
    }

    private onTouch(evt: egret.TouchEvent) {
        this.createBall(evt.stageX, evt.stageY);
    }

    private tick(timestamp: number): boolean {
        const interval = timestamp - this.lastTime;
        this.lastTime = timestamp;
        //console.log(timestamp, this.lastTime, interval);

        this.physicsWorld.tick(interval / 1000);
        const bodies = this.physicsWorld.theWorld().bodies;
        for (const body of bodies) {
            body.displays[0].x = body.position[0];
            body.displays[0].y = body.position[1];
            body.displays[0].rotation = body.angle * 180 / Math.PI;
        }
        return false;
    }

    private createBackground() {
        const bg: egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(0x888888, 1);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private createGround() {
        const options = {
            position: [this.stage.stageWidth / 2, this.stage.stageHeight - 100 / 2],
            dimension: [this.stage.stageWidth, 100]
        };

        this.ground = new Box(options);
        this.physicsWorld.theWorld().addBody(this.ground.theBody());
        this.addChild(this.ground.theSkin());
    }

    private createBoxBrick() {
        const options = {
            position: [this.stage.stageWidth / 2, this.stage.stageHeight - 200],
            dimension: [60, 60],
            alpha: 0
        };

        this.boxBrick = new BoxBrick(options);
        this.physicsWorld.theWorld().addBody(this.boxBrick.theBody());
        this.addChild(this.boxBrick);
    }

    private createCircleBrick() {
        const options = {
            position: [this.stage.stageWidth / 2 - 100, this.stage.stageHeight - 200],
            radius: 30,
            alpha: 0
        };

        this.circleBrick = new CircleBrick(options);
        this.physicsWorld.theWorld().addBody(this.circleBrick.theBody());
        this.addChild(this.circleBrick);
    }

    private createBall(x: number, y: number) {
        const options = {
            position: [x, y],
        };

        this.ball = new Ball(options);
        this.physicsWorld.theWorld().addBody(this.ball.theBody());
        this.addChild(this.ball);

        this.ball.theBody().mass = 0;
        this.ball.theBody().applyImpulse([0 , 1000], [0, 0]);
    }
}
