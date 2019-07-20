
class GameScene extends egret.DisplayObjectContainer {

    private physicsWorld: PhysicsWorld;
    private p2DebugDraw: p2DebugDraw;

    private ground: Ground;
    private topWall: Wall;
    private leftWall: Wall;
    private rightWall: Wall;
    private boxBrick: Brick;
    private circleBrick: Brick;

    private lastTime: number;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.setup();
        this.touchEnabled = true;
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
    }

    private setup() {
        this.physicsWorld = new PhysicsWorld();
        this.p2DebugDraw = new p2DebugDraw(this.physicsWorld.theWorld());
        this.lastTime = 0;

        this.physicsWorld.setup();
        this.createBackground();
        this.createTopWall();
        this.createLeftWall();
        this.createRightWall();
        this.createGround();
        this.createBricks();

        // const debugSprite = new egret.Sprite();
        // this.addChild(debugSprite);
        // this.p2DebugDraw.setSprite(debugSprite);

        egret.startTick(this.tick, this);
    }

    private onTouchTap(evt: egret.TouchEvent) {
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
        const position: number[] = [this.stage.stageWidth / 2, this.stage.stageHeight - 100 / 2];
        const dimension: number[] = [this.stage.stageWidth, 100];

        this.ground = RoleHelper.createGround(position, dimension);
        this.physicsWorld.theWorld().addBody(this.ground.theBody());
        this.addChild(this.ground);
    }

    private createTopWall() {
        const position: number[] = [this.stage.stageWidth / 2, 20];
        const dimension: number[] = [this.stage.stageWidth, 40];

        this.topWall = RoleHelper.createWall(position, dimension);
        this.physicsWorld.theWorld().addBody(this.topWall.theBody());
        this.addChild(this.topWall);
    }

    private createLeftWall() {
        const position: number[] = [0, this.stage.stageHeight / 2];
        const dimension: number[] = [80, this.stage.stageHeight];

        this.leftWall = RoleHelper.createWall(position, dimension);
        this.physicsWorld.theWorld().addBody(this.leftWall.theBody());
        this.addChild(this.leftWall);
    }

    private createRightWall() {
        const position: number[] = [this.stage.stageWidth, this.stage.stageHeight / 2];
        const dimension: number[] = [80, this.stage.stageHeight];

        this.rightWall = RoleHelper.createWall(position, dimension);
        this.physicsWorld.theWorld().addBody(this.rightWall.theBody());
        this.addChild(this.rightWall);
    }

    private createBricks() {
        const total = 100;
        const portions = MathHelper.randomPortions(total, 5, 0.1, 0.8);
        const distance = 80;
        const sizeMin = 50;
        const sizeMax = 60;

        let pm = 1;
        for (let i = 0; i < portions.length; ++i) {
            const portion = portions[i];

            const initialX = this.stage.stageWidth / 2;
            const initialY = this.stage.stageHeight - 200;
            const offset = Math.floor((i + 1) / 2);
            const offsetX = distance * offset * pm;
            pm = - pm;
            const position: number[] = [initialX + offsetX, initialY];

            const size = MathHelper.randomInteger(sizeMin, sizeMax);
            const dimension: number[] = [size, size];

            const brick = RoleHelper.createBrick(position, dimension);
            brick.setNumber(portion);
            this.physicsWorld.theWorld().addBody(brick.theBody());
            this.addChild(brick);
        }
    }

    private createBall(x: number, y: number) {
        const xStart = this.stage.stageWidth / 2;
        const yStart = 100;

        const position: number[] = [xStart, yStart];

        const ball = RoleHelper.createBall(position);
        this.physicsWorld.theWorld().addBody(ball.theBody());
        this.addChild(ball);

        const xDelta = x - xStart;
        const yDelta = y - yStart;
        const impuse = MathHelper.calAxisDivide(xDelta, yDelta, 10000);

        ball.theBody().mass = 0
        ball.theBody().applyImpulse(impuse, [0, 0]);
        
        console.log("born", ball.theBody().id, ball.theBody().velocity[0], ball.theBody().velocity[1]);
    }
}
