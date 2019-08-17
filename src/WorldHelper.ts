
class WorldHelper {

    private static STAGE_WIDTH = 640;
    private static STAGE_HEIGHT = 1136;
    
    private static WIDTH_RATIO = 1;
    private static HEIGHT_RATIO = 1;

    public static setup(stageWidth: number, stageHeight: number) {
        this.STAGE_WIDTH = stageWidth;
        this.STAGE_HEIGHT = stageHeight;
        this.WIDTH_RATIO = this.STAGE_WIDTH / Constant.STAGE_WIDTH;
        this.HEIGHT_RATIO = this.STAGE_HEIGHT / Constant.STAGE_HEIGHT;
    }

    public static adaptWidth(width: number): number {
        return Math.floor(width * WorldHelper.WIDTH_RATIO);
    }

    public static adaptHeight(height: number): number {
        return Math.floor(height * WorldHelper.HEIGHT_RATIO);
    }

    public static stageWidth(): number {
        return this.STAGE_WIDTH;
    }

    public static stageHeight(): number {
        return this.STAGE_HEIGHT;
    }

    public static roofWidth(): number {
        const result = this.stageWidth();
        return this.adaptWidth(result);
    }

    public static roofHeight(): number {
        const result = Constant.ROOF_HEIGHT;
        return this.adaptHeight(result);
    }

    public static roofX(): number {
        const result = this.stageWidth() / 2;
        return this.adaptWidth(result);
    }

    public static roofY(): number {
        const result = Constant.ROOF_OFFSET + this.roofHeight() / 2;
        return this.adaptHeight(result);
    }

    public static scoreBoardX(): number {
        const result = this.stageWidth() / 2;
        return this.adaptWidth(result);
    }

    public static scoreBoardY(): number {
        const result = Constant.ROOF_OFFSET / 2;
        return this.adaptHeight(result);
    }

    public static wallWidth(): number {
        const result = Constant.WALL_WIDTH;
        return this.adaptWidth(result);
    }

    public static wallHeight(): number {
        const result = Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * Constant.LINE_NUMBER;
        return this.adaptHeight(result);
    }

    public static wallX(): number {
        const result = Constant.TUNNEL_WIDTH + Constant.WALL_WIDTH / 2;
        return this.adaptWidth(result);
    }

    public static wallY(): number {
        return this.wallHeight() / 2;
    }

    public static tunnelWidth(): number {
        const result = Constant.TUNNEL_WIDTH;
        return this.adaptWidth(result);
    }

    public static gunHeight(): number {
        return Constant.GUN_HEIGHT;
    }

    public static gunX(): number {
        return this.stageWidth() / 2;
    }

    public static gunY(): number {
        const result = Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT;
        return this.adaptHeight(result);
    }

    public static lineHeight(): number {
        const result = Constant.LINE_HEIGHT;
        return this.adaptHeight(result);
    }

    public static brickInitialY(): number {
        const result = Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * (Constant.LINE_NUMBER - 1 /2);
        return this.adaptHeight(result);
    }
    
    public static brickFixedXs(): number[] {
        const result = [110, 195, 280, 365, 450, 535];
        result.every((val, idx, array) => {
            this.adaptWidth(val);
            return true;
        });
        return result;
    }

    public static brickSizeMin(): number {
        const result = Constant.BRICK_SIZE_MIN;
        return this.adaptWidth(result);
    }

    public static brickSizeMax(): number {
        const result = Constant.BRICK_SIZE_MAX;
        return this.adaptWidth(result);
    }

    public static baffleWidth(): number {
        const result = Constant.BAFFLE_WIDTH;
        return this.adaptWidth(result);
    }

    public static baffleHeight(): number {
        const result = Constant.BAFFLE_HEIGHT;
        return this.adaptHeight(result);
    }

    public static groundOffset(): number {
        const result = Constant.ROOF_OFFSET + Constant.ROOF_HEIGHT +
            Constant.GUN_HEIGHT +
            Constant.LINE_HEIGHT * Constant.LINE_NUMBER +
            Constant.FALL_HEIGHT;
        return this.adaptHeight(result);
    }
}