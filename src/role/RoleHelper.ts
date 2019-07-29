
class RoleHelper {

    public static colors: number[] = [0x00F5FF, 0x00CD66, 0xFF0000, 0x1E90FF,
        0xFFEC8B, 0xFF1493, 0x0000FF, 0xFF6A6A];

    public static createBall(): Ball {
        const options = {
            type: p2.Body.DYNAMIC,
            mass: 1,
            textureName: "ball_png"
        };

        const ball = new Ball(options);
        ball.setup();
        return ball;
    }
    
    public static createBrick(width: number, height: number): Brick {
        const randStyle = MathHelper.randomInteger(EBrick.BOX, EBrick.TRIANGLE);
        const options = {
            type: p2.Body.STATIC,
            mass: 0,
            width: width,
            height: height,
            color: this.randomColor(),
            alpha: 0,
            borderThickness: 4,
            borderColor: this.randomColor(),
            style: randStyle
        };
        
        const brick = new Brick(options);
        brick.setup();
        return brick;
    }

    public static createWall(width: number, height: number): Wall {
        const options = {
            type: p2.Body.STATIC,
            mass: 0,
            width: width,
            height: height,
            color: 0xC1CDCD,
            alpha: 1,
            borderThickness: 0,
            borderColor: 0xC1CDCD,
        };

        const wall = new Wall(options);
        wall.setup();
        return wall;
    }

    public static createGround(width: number, height: number): Ground {
        const options = {
            type: p2.Body.STATIC,
            mass: 0,
            width: width,
            height: height,
            color: 0x8B795E,
            alpha: 1,
            borderThickness: 0,
            borderColor: 0x8B795E,
        };

        const ground = new Ground(options);
        ground.setup();
        return ground;
    }
    
    public static createLine(): Line {
        const options = {
            distance: 800,
            thickness: 4,
            color: 0x00FF00,
            gap: 10
        };

        const line = new Line(options);
        line.setup();
        return line;
    }

    public static randomColor() {
        const index = MathHelper.randomInteger(0, this.colors.length - 1);
        return this.colors[index];
    }
}
