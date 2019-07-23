
class GameWorld extends egret.DisplayObjectContainer {

    private stageWidth: number = 0;
    private stageHeight: number = 0;

    private physicsWorld: PhysicsWorld;

    private ground: Ground;
    private topWall: Wall;
    private leftWall: Wall;
    private rightWall: Wall;

    private bricks: Brick[] = [];
    private balls: Ball[] = [];
    private dyingBalls: Ball[] = [];
    private deadBalls: Ball[] = [];
    
    public constructor() {
        super();
    }

    public setup(stageWidth: number, stageHeight: number) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.physicsWorld = new PhysicsWorld();
        this.physicsWorld.setup();

        this.createBackground();
        this.createTopWall();
        this.createLeftWall();
        this.createRightWall();
        this.createGround();
        this.createBricks();
    }

    public tick(): boolean {
        this.physicsWorld.tick(16 / 1000);
        this.bricksTick();
        this.ballsTick();
        return false;
    }

    public onTouchTap(x: number, y: number) {
        this.createBall(x, y);
    }

    private bricksTick() {

    }

    private ballsTick() {
        for (const ball of this.balls) {
            if (ball.getState() == EBallState.DYING) {
                if (ball.x < Constant.BALL_DEAD_DISTANCE || ball.x > this.stageWidth - Constant.BALL_DEAD_DISTANCE) {
                    this.removeBall(ball);
                }
            }
        }

        for (const ball of this.dyingBalls) {
            const index = this.balls.indexOf(ball);
            if (index >= 0) {
                this.balls.splice(index, 1);
            }

            ball.setState(EBallState.DEAD);
            ball.x = ball.x < this.stageWidth / 2 ? 40 : this.stageWidth - 40;
            this.deadBalls.push(ball);
        }
        this.dyingBalls.length = 0;

        for (const ball of this.deadBalls) {
            ball.y -= 10;
            if (ball.getState() == EBallState.DEAD) {
                if (ball.y < 40) {
                    ball.setState(EBallState.DISAPPEAR);
                    this.removeChild(ball);
                }
            }
        }
    }

    private addBall(ball: Ball) {
        this.physicsWorld.addBody(ball.theBody());
        this.addChild(ball);
        this.balls.push(ball);
    }

    private removeBall(ball: Ball) {
        this.physicsWorld.removeBody(ball.theBody());
        this.dyingBalls.push(ball);
    }

    private createBackground() {
        const bg: egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(0x888888, 1);
        bg.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private createGround() {
        const dimension: number[] = [this.stageWidth, 100];

        this.ground = RoleHelper.createGround(dimension);
        this.physicsWorld.addBody(this.ground.theBody());
        this.addChild(this.ground);

        const position: number[] = [this.stageWidth / 2, this.stageHeight - 100 / 2];
        this.ground.theBody().position = position;
    }

    private createTopWall() {
        const dimension: number[] = [this.stageWidth, 40];

        this.topWall = RoleHelper.createWall(dimension);
        this.physicsWorld.addBody(this.topWall.theBody());
        this.addChild(this.topWall);
        
        const position: number[] = [this.stageWidth / 2, 20];
        this.topWall.theBody().position = position;
    }

    private createLeftWall() {
        const dimension: number[] = [80, this.stageHeight];

        this.leftWall = RoleHelper.createWall(dimension);
        this.physicsWorld.addBody(this.leftWall.theBody());
        this.addChild(this.leftWall);
        
        const position: number[] = [0, this.stageHeight / 2];
        this.leftWall.theBody().position = position;
    }

    private createRightWall() {
        const dimension: number[] = [80, this.stageHeight];

        this.rightWall = RoleHelper.createWall(dimension);
        this.physicsWorld.addBody(this.rightWall.theBody());
        this.addChild(this.rightWall);

        const position: number[] = [this.stageWidth, this.stageHeight / 2];
        this.rightWall.theBody().position = position;
    }

    private createBricks() {
        const total = 100;
        const portions = MathHelper.randomPortions(total, 5, 0.1, 0.8);
        const distance = 100;
        const sizeMin = 60;
        const sizeMax = 60;

        let pm = 1;
        for (let i = 0; i < portions.length; ++i) {
            const portion = portions[i];

            const initialX = this.stageWidth / 2;
            const initialY = this.stageHeight - 200;
            const offset = Math.floor((i + 1) / 2);
            const offsetX = distance * offset * pm;
            pm = - pm;
            const position: number[] = [initialX + offsetX, initialY];

            const size = MathHelper.randomInteger(sizeMin, sizeMax);
            const dimension: number[] = [size, size];

            const brick = RoleHelper.createBrick(dimension);
            brick.setNumber(portion);
            this.physicsWorld.addBody(brick.theBody());
            this.addChild(brick);

            brick.theBody().position = position;
            brick.theBody().angle = Math.random() * Math.PI;
        }
    }

    private createBall(x: number, y: number) {
        const ball = RoleHelper.createBall();
        this.addBall(ball);

        const xStart = this.stageWidth / 2;
        const yStart = 100;

        const xDelta = x - xStart;
        const yDelta = y - yStart;
        const impuse = MathHelper.calAxisDivide(xDelta, yDelta, 1000);

        ball.theBody().position = [xStart, yStart];
        ball.theBody().mass = 0
        ball.theBody().applyImpulse(impuse, [0, 0]);
    }
}
