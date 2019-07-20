
class RoleHelper {

    public static createBall(position: number[]): Ball {
        const options = {
            position: position,
            mass: 10
        };

        const ball = new Ball(options);
        return ball;
    }
    
    public static createBrick(position: number[], dimension: number[]): Brick {
        const options = {
            position: position,
            mass: 0,
            dimension: dimension,
            color: 0x00FF00,
            alpha: 0
        };

        const randValue = MathHelper.randomInteger(EBrick.BOX, EBrick.TRIANGLE);
        switch (randValue) {
            case EBrick.CIRCLE:
                return this.createCircleBrick(position, dimension);
            default:
                return this.createBoxBrick(position, dimension);
        }
    }

    public static createWall(position: number[], dimension: number[]): Wall {
        const options = {
            position: position,
            mass: 0,
            dimension: dimension,
            color: 0x000000,
            alpha: 1
        };

        const wall = new Wall(options);
        return wall;
    }

    public static createGround(position: number[], dimension: number[]): Ground {
        const options = {
            position: position,
            mass: 0,
            dimension: dimension,
            color: 0xFF0000,
            alpha: 1
        };

        const ground = new Ground(options);
        return ground;
    }

    private static createBoxBrick(position: number[], dimension: number[]) {
        const options = {
            position: position,
            mass: 0,
            dimension: dimension,
            color: 0x00FF00,
            alpha: 0
        };

        const brick = new BoxBrick(options);
        return brick;
    }

    private static createCircleBrick(position: number[], dimension: number[]) {
        const options = {
            position: position,
            mass: 0,
            radius: dimension[1] / 2,
            color: 0x00FF00,
            alpha: 0
        };

        const brick = new CircleBrick(options);
        return brick;
    }
}
