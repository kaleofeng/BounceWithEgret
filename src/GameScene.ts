
class GameScene extends egret.DisplayObjectContainer {

    private physicsWorld: PhysicsWorld;
    private p2DebugDraw: p2DebugDraw;

    private ground: Box;
    private brick: Brick;
    private ball: Ball;

    private lastTime: number;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.setup();
    }

    private setup() {
        this.physicsWorld = new PhysicsWorld();
        this.p2DebugDraw = new p2DebugDraw(this.physicsWorld.theWorld());
        this.lastTime = 0;

        this.physicsWorld.setup();
        this.createBackground();
        this.createGround();
        this.createBrick();
        this.createBall();

        // const debugSprite = new egret.Sprite();
        // this.addChild(debugSprite);
        // this.p2DebugDraw.setSprite(debugSprite);

        egret.startTick(this.tick, this);
    }

    private tick(timestamp: number): boolean {
        const interval = timestamp - this.lastTime;
        this.lastTime = timestamp;
        console.log(timestamp, this.lastTime, interval);

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
        bg.graphics.beginFill(0xFFFFFF, 1);
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

    private createBrick() {
        const options = {
            position: [this.stage.stageWidth / 2, this.stage.stageHeight - 200],
            dimension: [40, 40]
        };

        this.brick = new BoxBrick(options);
        this.physicsWorld.theWorld().addBody(this.brick.theBody());
        this.addChild(this.brick);
    }

    private createBall() {
        const options = {
            position: [this.stage.stageWidth / 2 + 50, this.stage.stageHeight - 200],
            radius: 20
        };

        this.ball = new Ball(options);
        this.physicsWorld.theWorld().addBody(this.ball.theBody());
        this.addChild(this.ball);

        //this.ball.theBody().applyImpulse([0 , 1000], [0, 0]);
    }
}
