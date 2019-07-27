
class GameWorld extends egret.DisplayObjectContainer {

    private stageWidth: number;
    private stageHeight: number;
    private gunX: number;
    private gunY: number;

    private physicsWorld: PhysicsWorld;

    private ground: Ground;
    private roof: Wall;
    private leftWall: Wall;
    private rightWall: Wall;
    private gun: Gun;
    private brickContainer: egret.DisplayObjectContainer;
    private ballContainer: egret.DisplayObjectContainer;
    private guideLine: Line;

    private bricks: Brick[] = [];
    private dyingBricks: Brick[] = [];

    private balls: Ball[] = [];
    private dyingBalls: Ball[] = [];
    private deadBalls: Ball[] = [];

    private speed: number;
    private level: number;
    private brickMaximum: number;
    private ballMaximum: number;
    private fired: boolean;
    private ballNumber: number;
    private targetPosition: number[];
    
    public constructor() {
        super();
    }

    public setup(stageWidth: number, stageHeight: number) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.gunX = this.stageWidth / 2;
        this.gunY = 50;

        this.physicsWorld = new PhysicsWorld();
        this.physicsWorld.setup();

        this.createBackground();
        this.createGround();
        this.createRoof();
        this.createLeftWall();
        this.createRightWall();
        this.createGun();
        this.createBrickContainer();
        this.createBallContainer();
        this.createGuideLine();
        this.init();
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
        if (!this.fired) {
            this.targetPosition = [x, y];
            this.fireBall();
            this.fired = true;
        }
    }

    public onTouchBegin(x: number, y: number) {
        if (!this.fired) {
            this.gun.updateDirection(x, y);

            const bulletPostion = this.gun.getBulletPostion();
            this.guideLine.updatePosition(bulletPostion[0], bulletPostion[1]);
            this.guideLine.updateDirection(x, y);
            this.guideLine.show();
        }
    }

    public onTouchMove(x: number, y: number) {
        if (!this.fired) {
            this.gun.updateDirection(x, y);
            
            const bulletPostion = this.gun.getBulletPostion();
            this.guideLine.updatePosition(bulletPostion[0], bulletPostion[1]);
            this.guideLine.updateDirection(x, y);
        }
    }

    public onTouchEnd(x: number, y: number) {
        if (!this.fired) {
            this.guideLine.hide();
        }
    }

    private init() {
        this.speed = 0;
        this.level = 0;
        this.brickMaximum = 100;
        this.ballMaximum = 10;
        this.fired = false;

        this.nextLevel();
    }

    private nextLevel() {
        this.speed = 2;
        ++this.level;
        this.brickMaximum += 10;
        this.ballMaximum += 1;
        this.fired = false;

        console.log("nextLevel", this.speed, this.level, this.brickMaximum, this.ballMaximum, this.fired);

        this.moveBricks();
        this.createBricks();
        this.ballNumber = this.ballMaximum;
        this.gun.updateBulletNumber(this.ballNumber);
    }

    private bricksTick() {
        for (const brick of this.bricks) {
            if (brick.getNumber() <=  0) {
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
        const ROOF_HEIGHT = Constant.ROOF_HEIGHT;
        const TUNNEL_WIDTH = Constant.TUNNEL_WIDTH;
        const TUNNEL_CENTER = Constant.TUNNEL_WIDTH / 2;

        for (const ball of this.balls) {
            if (ball.getState() == EBallState.DYING) {
                if (ball.display().x < TUNNEL_WIDTH || ball.display().x > this.stageWidth - TUNNEL_WIDTH) {
                    this.killBall(ball);
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

        let disappearBallNumber: number = 0;
        for (const ball of this.deadBalls) {
            ball.display().y -= 10;
            if (ball.getState() == EBallState.DEAD) {
                if (ball.display().y < ROOF_HEIGHT) {
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
            this.speed = 4;
        }
    }

    private fireBall() {
        if (this.ballNumber > 0) {
            --this.ballNumber;
            this.gun.updateBulletNumber(this.ballNumber);
            this.gun.fire();
            this.createBall();
            setTimeout(this.fireBall.bind(this), 400 / this.speed);
        }
    }

    private moveBricks() {
        for (const brick of this.bricks) {
            brick.body().position[1] -= 100;
        }
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
        
        const distance = 100;
        const posXs = MathHelper.randomValues([110, 195, 280, 365, 450, 535], portions.length);
        const posY = this.stageHeight - 200;
        
        const sizeMin = 60;
        const sizeMax = 50;

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
