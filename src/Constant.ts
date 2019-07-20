
class Constant {

    public static BALL_MATERIAL = 1;
    public static BRICK_MATERIAL = 2;
    public static WALL_MATERIAL = 3;
    public static GROUND_MATERIAL = 9;

    public static BALL_COLLISION_GROUP = Math.pow(2, 1);
    public static BRICK_COLLISION_GROUP = Math.pow(2, 2);
    public static WALL_COLLISION_GROUP = Math.pow(2, 3);
    public static GROUND_COLLISION_GROUP = Math.pow(2, 9);

    public static BORDER_THICKNESS = 10;
}

enum ERole {

    NONE = 0,
    BALL,
    BRICK,
    WALL,
    GROUND = 9
}

enum EBrick {

    NONE = 0,
    BOX,
    CIRCLE,
    TRIANGLE
}
