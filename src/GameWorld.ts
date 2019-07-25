
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
                if (ball.display().x < Constant.BALL_DEAD_DISTANCE || ball.display().x > this.stageWidth - Constant.BALL_DEAD_DISTANCE) {
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
            ball.display().x = ball.display().x < this.stageWidth / 2 ? 20 : this.stageWidth - 20;
            this.deadBalls.push(ball);
        }
        this.dyingBalls.length = 0;

        for (const ball of this.deadBalls) {
            ball.display().y -= 10;
            if (ball.getState() == EBallState.DEAD) {
                if (ball.display().y < 40) {
                    ball.setState(EBallState.DISAPPEAR);
                    this.removeChild(ball.display());
                }
            }
        }
    }

    private addBall(ball: Ball) {
        this.physicsWorld.addBody(ball.body());
        this.addChild(ball.display());
        this.balls.push(ball);
    }

    private removeBall(ball: Ball) {
        this.physicsWorld.removeBody(ball.body());
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
        this.ground = RoleHelper.createGround(this.stageWidth, 100);
        this.physicsWorld.addBody(this.ground.body());
        this.addChild(this.ground.display());

        const position: number[] = [this.stageWidth / 2, this.stageHeight - 100 / 2];
        this.ground.body().position = position;
    }

    private createTopWall() {
        this.topWall = RoleHelper.createWall(this.stageWidth, 40);
        this.physicsWorld.addBody(this.topWall.body());
        this.addChild(this.topWall.display());
        
        const position: number[] = [this.stageWidth / 2, 20];
        this.topWall.body().position = position;
    }

    private createLeftWall() {
        this.leftWall = RoleHelper.createWall(20, this.stageHeight);
        this.physicsWorld.addBody(this.leftWall.body());
        this.addChild(this.leftWall.display());
        
        const position: number[] = [50, this.stageHeight / 2 - 100];
        this.leftWall.body().position = position;
    }

    private createRightWall() {
        this.rightWall = RoleHelper.createWall(20, this.stageHeight);
        this.physicsWorld.addBody(this.rightWall.body());
        this.addChild(this.rightWall.display());

        const position: number[] = [this.stageWidth - 50, this.stageHeight / 2 - 100];
        this.rightWall.body().position = position;
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

            const brick = RoleHelper.createBrick(size, size);
            brick.setNumber(portion);
            this.physicsWorld.addBody(brick.body());
            this.addChild(brick.display());

            brick.body().position = position;
            brick.body().angle = Math.random() * Math.PI;
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

        ball.body().position = [xStart, yStart];
        ball.body().mass = 0
        ball.body().applyImpulse(impuse, [0, 0]);
    }
}
