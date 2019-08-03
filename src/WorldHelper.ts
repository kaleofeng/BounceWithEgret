
class WorldHelper {

    public static roofHeight() {
        return Constant.ROOF_HEIGHT;
    }

    public static roofY() {
        return Constant.ROOF_OFFSET + this.roofHeight() / 2;
    }

    public static wallWidth() {
        return Constant.WALL_WIDTH;
    }

    public static wallHeight() {
        return Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * Constant.LINE_NUMBER;
    }

    public static wallX() {
        return Constant.TUNNEL_WIDTH + Constant.WALL_WIDTH / 2;
    }

    public static wallY() {
        return this.wallHeight() / 2;
    }

    public static gunHeight() {
        return Constant.GUN_HEIGHT;
    }

    public static gunY() {
        return Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT;
    }

    public static brickTotalHeight() {
        return Constant.LINE_HEIGHT * Constant.LINE_NUMBER;
    }

    public static brickInitialY() {
        return Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * (Constant.LINE_NUMBER - 1 /2);
    }
    
    public static brickFixedXs() {
        return [110, 195, 280, 365, 450, 535];
    }

    public static groundOffset() {
        return Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * Constant.LINE_NUMBER +
            Constant.FALL_HEIGHT;
    }
}