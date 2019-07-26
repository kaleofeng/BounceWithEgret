
class RoleHelper {

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
            color: 0x00FF00,
            alpha: 0,
            borderThickness: 4,
            borderColor: 0x0000FF,
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
            color: 0x00FF00,
            alpha: 0,
            borderThickness: 4,
            borderColor: 0x0000FF,
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
            color: 0x00FF00,
            alpha: 1,
            borderThickness: 4,
            borderColor: 0x0000FF,
        };

        const ground = new Ground(options);
        ground.setup();
        return ground;
    }
    
    public static createLine(): Line {
        const options = {
            distance: 800,
            thickness: 4,
            color: 0x6633FF,
            gap: 10
        };

        const line = new Line(options);
        line.setup();
        return line;
    }
}
