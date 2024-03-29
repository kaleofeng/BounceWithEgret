
class GameWorld extends egret.DisplayObjectContainer {

    private lastTimestamp: number = 0;
    private speedRatio: number = 1;

    private gunX: number;
    private gunY: number;

    private physicsWorld: PhysicsWorld;

    public ground: Ground;
    public roof: Wall;
    private scoreBoard: egret.TextField;
    public leftWall: Wall;
    public rightWall: Wall;
    public gun: Gun;
    private brickContainer: egret.DisplayObjectContainer;
    private ballContainer: egret.DisplayObjectContainer;
    private baffleContainer: egret.DisplayObjectContainer;
    public guideLine: Line;

    private bricks: Brick[] = [];
    private dyingBricks: Brick[] = [];

    private balls: Ball[] = [];
    private dyingBalls: Ball[] = [];
    private deadBalls: Ball[] = [];

    private baffles: Baffle[] = [];

    private step: Step;
    private speed: number;
    private level: number;
    private brickMaximum: number;
    private ballMaximum: number;
    private ballNumber: number;
    private targetPosition: number[];

    private score: number = 0;
    
    public constructor() {
        super();
    }

    public setup(stageWidth: number, stageHeight: number) {
        console.log("Game setup", stageWidth, stageHeight);

        WorldHelper.setup(stageWidth, stageHeight);

        this.gunX = WorldHelper.gunX();
        this.gunY = WorldHelper.gunY();

        this.physicsWorld = new PhysicsWorld(this);
        this.physicsWorld.setup();

        this.createBackground();
        this.createGround();
        this.createRoof();
        this.createScoreBoard();
        this.createLeftWall();
        this.createRightWall();
        this.createGun();
        this.createBrickContainer();
        this.createBallContainer();
        this.createBaffleContainer();
        this.createGuideLine();
        this.init();

        SoundManager.setup();
    }

    public tick(timestamp: number): boolean {
        //console.log("Game tick", timestamp);

        if (this.lastTimestamp <= 0) {
            this.lastTimestamp = timestamp;
        }

        const interval = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        this.speedRatio = Math.max(interval / 16, 1);

        let count = Math.floor(this.speed * this.speedRatio);
        while (count-- > 0) {
            this.physicsWorld.tick(10 / 1000);
            this.bricksTick();
            this.ballsTick();
        }
        return false;
    }

    public onTouchBegin(x: number, y: number) {
        this.step.onTouchBegin(x, y);
    }

    public onTouchMove(x: number, y: number) {
        this.step.onTouchMove(x, y);
    }

    public onTouchEnd(x: number, y: number) {
        this.step.onTouchEnd(x, y);
    }

    public onTouchTap(x: number, y: number) {
        this.targetPosition = [x, y];
        this.step.onTouchTap(x, y);
    }

    public switchStep(step: Step) {
        this.step = step;
        this.step.reset(this);
    }

    public fireBall() {
        if (this.ballNumber > 0) {
            --this.ballNumber;
            this.gun.updateBulletNumber(this.ballNumber);
            this.gun.fire();
            this.createBall();
            setTimeout(this.fireBall.bind(this), 600 / this.speed);
        }
    }

    public incScore() {
        ++this.score;
        this.scoreBoard.text = this.score.toString(10);
    }

    private init() {
        this.switchStep(StepFire.Instance());
        this.speed = 0;
        this.level = 0;
        this.brickMaximum = 50;
        this.ballMaximum = 10;

        console.log("Game init");

        this.nextLevel();
    }

    private nextLevel() {
        this.switchStep(StepFire.Instance());
        this.speed = 3;
        ++this.level;
        this.brickMaximum += 5;
        this.ballMaximum += 1;

        console.log("Game next level", this.speed, this.level, this.brickMaximum, this.ballMaximum);

        this.ballNumber = this.ballMaximum;
        this.reloadGun();
        this.growBricks();
        this.createBricks();
        this.clearBaffles();
    }

    private gameOver() {
        console.log("Game over");
    }

    private bricksTick() {
        for (const brick of this.bricks) {
            if (brick.getAge() >= Constant.DEAD_AGE) {
                this.gameOver();
                return;
            }

            if (brick.getNumber() <= 0) {
                this.killBrick(brick);
            }
        }

        for (const brick of this.dyingBricks) {
            const index = this.bricks.indexOf(brick);
            if (index >= 0) {
                this.bricks.splice(index, 1);
            }
            
            this.removeBrick(brick);
        }
        this.dyingBricks.length = 0;
    }

    private ballsTick() {
        const STAGE_WIDTH = WorldHelper.stageWidth();
        const TUNNEL_WIDTH = WorldHelper.tunnelWidth();
        const TUNNEL_CENTER = TUNNEL_WIDTH / 2;

        for (const ball of this.balls) {
            if (ball.display().x < TUNNEL_WIDTH || ball.display().x > STAGE_WIDTH - TUNNEL_WIDTH) {
                ball.setState(EBallState.DYING);
                this.killBall(ball);
            }
        }

        for (const ball of this.dyingBalls) {
            const index = this.balls.indexOf(ball);
            if (index >= 0) {
                this.balls.splice(index, 1);
            }

            ball.setState(EBallState.DEAD);
            ball.display().x = ball.display().x < STAGE_WIDTH / 2 ? TUNNEL_CENTER : STAGE_WIDTH - TUNNEL_CENTER;
            this.deadBalls.push(ball);
        }
        this.dyingBalls.length = 0;

        let disappearBallNumber: number = 0;
        for (const ball of this.deadBalls) {
            ball.display().y -= 10;
            if (ball.getState() == EBallState.DEAD) {
                if (ball.display().y < WorldHelper.gunY()) {
                    ball.setState(EBallState.DISAPPEAR);
                    this.removeBall(ball);
                }
            }
            if (ball.getState() == EBallState.DISAPPEAR) {
                ++disappearBallNumber;
            }
        }
        if (disappearBallNumber == this.deadBalls.length) {
            this.deadBalls.length = 0;
        }

        const totalBallNumber = this.ballNumber + this.balls.length + this.dyingBalls.length + this.deadBalls.length;
        if (totalBallNumber < 1) {
            this.nextLevel();
        } else if (this.ballNumber + this.balls.length < this.ballMaximum / 2) {
            this.speed = 6;
        }
    }

    private reloadGun() {
        this.gun.updateBulletNumber(this.ballNumber);
        this.gun.resetDirection();
    }

    private growBricks() {
        for (const brick of this.bricks) {
            brick.incAge();
            brick.body().position[1] -= WorldHelper.lineHeight();
            brick.body().angularVelocity = Math.random() * 0.5;
        }
    }

    private clearBaffles() {
        for (const baffle of this.baffles) {
            this.removeBaffle(baffle);
        }
        this.baffles.length = 0;
    }

    private addBrick(brick: Brick) {
        this.physicsWorld.addBody(brick.body());
        this.brickContainer.addChild(brick.display());
        this.bricks.push(brick);
    }

    private killBrick(brick: Brick) {
        this.physicsWorld.removeBody(brick.body());
        this.dyingBricks.push(brick);
    }

    private removeBrick(brick: Brick) {
        this.brickContainer.removeChild(brick.display());
    }

    private addBall(ball: Ball) {
        this.physicsWorld.addBody(ball.body());
        this.ballContainer.addChild(ball.display());
        this.balls.push(ball);
    }

    private killBall(ball: Ball) {
        this.physicsWorld.removeBody(ball.body());
        this.dyingBalls.push(ball);
    }

    private removeBall(ball: Ball) {
        this.ballContainer.removeChild(ball.display());
    }

    public addBaffle(baffle: Baffle) {
        this.physicsWorld.addBody(baffle.body());
        this.baffleContainer.addChild(baffle.display());
        this.baffles.push(baffle);
    }

    private removeBaffle(baffle: Baffle) {
        this.physicsWorld.removeBody(baffle.body());
        this.baffleContainer.removeChild(baffle.display());
    }

    private createBackground() {
        const bg: egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(0x4169E1, 1);
        bg.graphics.drawRect(0, 0, WorldHelper.stageWidth(), WorldHelper.stageHeight());
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private createGround() {
        const groundWidth = WorldHelper.stageWidth();
        const groundHeight = WorldHelper.stageHeight() - WorldHelper.groundOffset();
        this.ground = RoleHelper.createGround(groundWidth, groundHeight);
        this.physicsWorld.addBody(this.ground.body());
        this.addChild(this.ground.display());

        const position: number[] = [WorldHelper.stageWidth() / 2, WorldHelper.stageHeight() - groundHeight / 3];
        this.ground.body().position = position;
    }

    private createRoof() {
        this.roof = RoleHelper.createWall(WorldHelper.stageWidth(), WorldHelper.roofHeight());
        this.physicsWorld.addBody(this.roof.body());
        this.addChild(this.roof.display());
        
        const position: number[] = [WorldHelper.stageWidth() / 2, WorldHelper.roofY()];
        this.roof.body().position = position;
    }

    protected createScoreBoard() {
        this.scoreBoard = new egret.TextField();
        this.scoreBoard.text = "0";
        this.scoreBoard.size = 36;
        this.scoreBoard.textColor = 0x00FFCC;
        this.scoreBoard.fontFamily = "KaiTi";
        this.scoreBoard.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreBoard.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.scoreBoard.border = false;
        this.scoreBoard.width = 160;
        this.scoreBoard.height = 40;
        this.addChild(this.scoreBoard);

        this.scoreBoard.anchorOffsetX = this.scoreBoard.width / 2;
        this.scoreBoard.anchorOffsetY = this.scoreBoard.height / 2;
        this.scoreBoard.x = WorldHelper.scoreBoardX();
        this.scoreBoard.y = WorldHelper.scoreBoardY();
    }

    private createLeftWall() {
        this.leftWall = RoleHelper.createWall(WorldHelper.wallWidth(), WorldHelper.wallHeight());
        this.physicsWorld.addBody(this.leftWall.body());
        this.addChild(this.leftWall.display());
        
        const position: number[] = [WorldHelper.wallX(), WorldHelper.wallY()];
        this.leftWall.body().position = position;
    }

    private createRightWall() {
        this.rightWall = RoleHelper.createWall(WorldHelper.wallWidth(), WorldHelper.wallHeight());
        this.physicsWorld.addBody(this.rightWall.body());
        this.addChild(this.rightWall.display());

        const position: number[] = [WorldHelper.stageWidth() - WorldHelper.wallX(), WorldHelper.wallY()];
        this.rightWall.body().position = position;
    }

    private createGun() {
        this.gun = new Gun();
        this.gun.setup();
        this.addChild(this.gun);

        this.gun.scaleX = 0.8;
        this.gun.scaleY = 0.8;
        this.gun.x = this.gunX;
        this.gun.y = this.gunY;
    }

    private createBrickContainer() {
        this.brickContainer = new egret.DisplayObjectContainer();
        this.addChild(this.brickContainer);
    }

    private createBallContainer() {
        this.ballContainer = new egret.DisplayObjectContainer();
        this.addChild(this.ballContainer);
    }

    private createBaffleContainer() {
        this.baffleContainer = new egret.DisplayObjectContainer();
        this.addChild(this.baffleContainer);
    }

    private createGuideLine() {
        this.guideLine = RoleHelper.createLine();
        this.addChild(this.guideLine);

        const bulletPostion = this.gun.getBulletPostion();
        this.guideLine.x = bulletPostion[0];
        this.guideLine.y = bulletPostion[1];
        this.guideLine.hide();
    }

    private createBricks() {
        const total = this.brickMaximum;
        const count = MathHelper.randomInteger(2, 5);
        const portions = MathHelper.randomPortions(total, count, 0.1, 0.8);
        
        const posXs = MathHelper.randomValues(WorldHelper.brickFixedXs(), portions.length);
        const posY = WorldHelper.brickInitialY();
        
        const sizeMin = WorldHelper.brickSizeMin();
        const sizeMax = WorldHelper.brickSizeMax();

        for (let i = 0; i < posXs.length; ++i) {
            const portion = portions[i];
            const posX = posXs[i];
            const size = MathHelper.randomInteger(sizeMin, sizeMax);

            const brick = RoleHelper.createBrick(size, size);
            brick.setNumber(portion);
            brick.setAge(1);
            this.addBrick(brick);

            brick.body().position = [posX, posY];
            brick.body().angle = Math.random() * Math.PI;
            brick.body().angularVelocity = Math.random() * 0.5;
        }
    }

    private createBall() {
        const ball = RoleHelper.createBall();
        this.addBall(ball);

        const bulletPostion = this.gun.getBulletPostion();
        const xStart = bulletPostion[0];
        const yStart = bulletPostion[1];

        const xTarget = this.targetPosition[0];
        const yTarget = this.targetPosition[1];

        const xDelta = xTarget - xStart;
        const yDelta = yTarget - yStart;
        const impuse = MathHelper.calAxisDivide(xDelta, yDelta, 750);

        ball.body().position = [xStart, yStart];
        ball.body().mass = 0
        ball.body().applyImpulse(impuse, [0, 0]);
    }
}
