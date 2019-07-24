
class RoleHelper {

    public static createBall(): Ball {
        const options = {
            type: p2.Body.DYNAMIC,
            mass: 1,
            textureName: "ball_png"
        };

        const ball = new Ball();
        ball.setup(options);
        return ball;
    }
    
    public static createBrick(dimension: number[]): Brick {
        const randValue = MathHelper.randomInteger(EBrick.BOX, EBrick.TRIANGLE);
        switch (randValue) {
            case EBrick.CIRCLE:
                return this.createCircleBrick(dimension);
            case EBrick.TRIANGLE:
                return this.createTriangleBrick(dimension);
            default:
                return this.createBoxBrick(dimension);
        }
    }

    public static createWall(dimension: number[]): Wall {
        const options = {
            mass: 0,
            dimension: dimension,
            color: 0x000000,
            alpha: 1
        };

        const wall = new Wall(options);
        return wall;
    }

    public static createGround(dimension: number[]): Ground {
        const options = {
            mass: 0,
            dimension: dimension,
            color: 0xFF0000,
            alpha: 1
        };

        const ground = new Ground(options);
        return ground;
    }

    private static createBoxBrick(dimension: number[]) {
        const options = {
            mass: 0,
            dimension: dimension,
            color: 0x00FF00,
            alpha: 0
        };

        const brick = new BoxBrick(options);
        return brick;
    }

    private static createCircleBrick(dimension: number[]) {
        const options = {
            mass: 0,
            dimension: dimension,
            color: 0x00FF00,
            alpha: 0
        };

        const brick = new CircleBrick(options);
        return brick;
    }

    private static createTriangleBrick(dimension: number[]) {
        const options = {
            mass: 0,
            dimension: dimension,
            color: 0x00FF00,
            alpha: 0
        };

        const brick = new TriangleBrick(options);
        return brick;
    }
}
