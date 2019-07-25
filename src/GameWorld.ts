
class GameWorld extends egret.DisplayObjectContainer {

    private stageWidth: number = 0;
    private stageHeight: number = 0;

    private physicsWorld: PhysicsWorld;

    private ground: Ground;
    private roof: Wall;
    private leftWall: Wall;
    private rightWall: Wall;

    private bricks: Brick[] = [];
    private dyingBricks: Brick[] = [];

    private balls: Ball[] = [];
    private dyingBalls: Ball[] = [];
    private deadBalls: Ball[] = [];

    private speed: number = 2;
    
    public constructor() {
        super();
    }

    public setup(stageWidth: number, stageHeight: number) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.physicsWorld = new PhysicsWorld();
        this.physicsWorld.setup();

        this.createBackground();
        this.createRoof();
        this.createLeftWall();
        this.createRightWall();
        this.createGround();
        this.createBricks();
    }

    public tick(): boolean {
        let count = this.speed;
        while (count-- > 0) {
            this.physicsWorld.tick(16 / 1000);
            this.bricksTick();
            this.ballsTick();
        }
        return false;
    }

    public onTouchTap(x: number, y: number) {
        this.createBall(x, y);
    }

    private bricksTick() {
        for (const brick of this.bricks) {
            if (brick.getNumber() <=  0) {
                this.removeBrick(brick);
            }
        }

        for (const brick of this.dyingBricks) {
            const index = this.bricks.indexOf(brick);
            if (index >= 0) {
                this.bricks.splice(index, 1);
            }
            
            this.removeChild(brick.display());
        }
        this.dyingBricks.length = 0;
    }

    private ballsTick() {
        const ROOF_HEIGHT = Constant.ROOF_HEIGHT;
        const TUNNEL_WIDTH = Constant.TUNNEL_WIDTH;
        const TUNNEL_CENTER = Constant.TUNNEL_WIDTH / 2;

        for (const ball of this.balls) {
            if (ball.getState() == EBallState.DATING) {
                if (ball.getVelocityPower() < 100) {
                    ball.applyImpulse([500, -500]);
                }
            }

            if (ball.getState() == EBallState.DYING) {
                if (ball.display().x < TUNNEL_WIDTH || ball.display().x > this.stageWidth - TUNNEL_WIDTH) {
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
            ball.display().x = ball.display().x < this.stageWidth / 2 ? TUNNEL_CENTER : this.stageWidth - TUNNEL_CENTER;
            this.deadBalls.push(ball);
        }
        this.dyingBalls.length = 0;

        for (const ball of this.deadBalls) {
            ball.display().y -= 10;
            if (ball.getState() == EBallState.DEAD) {
                if (ball.display().y < ROOF_HEIGHT) {
                    ball.setState(EBallState.DISAPPEAR);
                    this.removeChild(ball.display());
                }
            }
        }
    }

    private addBrick(brick: Brick) {
        this.physicsWorld.addBody(brick.body());
        this.addChild(brick.display());
        this.bricks.push(brick);
    }

    private removeBrick(brick: Brick) {
        this.physicsWorld.removeBody(brick.body());
        this.dyingBricks.push(brick);
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
        this.ground = RoleHelper.createGround(this.stageWidth, Constant.GROUND_HEIGHT);
        this.physicsWorld.addBody(this.ground.body());
        this.addChild(this.ground.display());

        const position: number[] = [this.stageWidth / 2, this.stageHeight - Constant.GROUND_HEIGHT / 2];
        this.ground.body().position = position;
    }

    private createRoof() {
        this.roof = RoleHelper.createWall(this.stageWidth, Constant.ROOF_HEIGHT);
        this.physicsWorld.addBody(this.roof.body());
        this.addChild(this.roof.display());
        
        const position: number[] = [this.stageWidth / 2, Constant.ROOF_HEIGHT / 2];
        this.roof.body().position = position;
    }

    private createLeftWall() {
        this.leftWall = RoleHelper.createWall(Constant.WALL_WIDTH, this.stageHeight);
        this.physicsWorld.addBody(this.leftWall.body());
        this.addChild(this.leftWall.display());
        
        const posX = Constant.TUNNEL_WIDTH + Constant.WALL_WIDTH / 2;
        const position: number[] = [posX, this.stageHeight / 2 - 100];
        this.leftWall.body().position = position;
    }

    private createRightWall() {
        this.rightWall = RoleHelper.createWall(20, this.stageHeight);
        this.physicsWorld.addBody(this.rightWall.body());
        this.addChild(this.rightWall.display());

        const posX = Constant.TUNNEL_WIDTH + Constant.WALL_WIDTH / 2;
        const position: number[] = [this.stageWidth - posX, this.stageHeight / 2 - 100];
        this.rightWall.body().position = position;
    }

    private createBricks() {
        const total = 100;
        const count = MathHelper.randomInteger(3, 5);
        const portions = MathHelper.randomPortions(total, count, 0.1, 0.8);
        
        const distance = 100;
        const posXs = MathHelper.randomValues([120, 220, 320, 420, 520], portions.length);
        const posY = this.stageHeight - 200;
        
        const sizeMin = 60;
        const sizeMax = 60;

        for (let i = 0; i < posXs.length; ++i) {
            const portion = portions[i];
            const posX = posXs[i];
            const size = MathHelper.randomInteger(sizeMin, sizeMax);

            const brick = RoleHelper.createBrick(size, size);
            brick.setNumber(portion);
            this.addBrick(brick);

            brick.body().position = [posX, posY];
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
