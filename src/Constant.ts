
class Constant {

    public static BALL_MATERIAL = 1;
    public static BRICK_MATERIAL = 2;
    public static WALL_MATERIAL = 3;
    public static BAFFLE_MATERIAL = 4;
    public static GROUND_MATERIAL = 9;

    public static BALL_COLLISION_GROUP = Math.pow(2, 1);
    public static BRICK_COLLISION_GROUP = Math.pow(2, 2);
    public static WALL_COLLISION_GROUP = Math.pow(2, 3);
    public static BAFFLE_COLLISION_GROUP = Math.pow(2, 4);
    public static GROUND_COLLISION_GROUP = Math.pow(2, 9);

    public static STAGE_WIDTH = 640;
    public static STAGE_HEIGHT = 1136;

    public static ROOF_OFFSET = 100;
    public static ROOF_HEIGHT = 20;
    public static WALL_WIDTH = 20;
    public static TUNNEL_WIDTH = 40;
    public static GUN_HEIGHT = 120;
    public static FALL_HEIGHT = 50;

    public static BRICK_SIZE_MIN = 50;
    public static BRICK_SIZE_MAX = 60;

    public static BAFFLE_WIDTH = 60;
    public static BAFFLE_HEIGHT = 20;
    
    public static LINE_HEIGHT = 90;
    public static LINE_NUMBER = 8;
    public static DEAD_AGE = 9;
}

enum ERole {

    NONE = 0,
    BALL,
    BRICK,
    WALL,
    BAFFLE,
    GROUND = 9
}

enum EBrick {

    NONE = 0,
    BOX,
    CIRCLE,
    TRIANGLE
}

enum EBallState {
    
    BORN = 0,
    DATING,
    DYING,
    DEAD,
    DISAPPEAR
}
