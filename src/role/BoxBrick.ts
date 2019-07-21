
class BoxBrick extends Brick {

    constructor(options: any) {
        super(options);
    }

    protected createDisplay() {
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);
        const color: number = OptionHelper.getOptionColor(this.options);
        const alpha: number = OptionHelper.getOptionAlpha(this.options);

        const thickness: number = Constant.BORDER_THICKNESS;
        const x: number = Constant.BORDER_THICKNESS / 2;
        const y: number = Constant.BORDER_THICKNESS / 2;
        const width: number = dimension[0] - Constant.BORDER_THICKNESS;
        const height: number = dimension[1] - Constant.BORDER_THICKNESS;

        this.anchorOffsetX = dimension[0] / 2;
        this.anchorOffsetY = dimension[1] / 2;
        
        this.graphics.lineStyle(thickness, 0x0000FF);
        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(x, y, width, height);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    protected createShape() {
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);

        const shape = new p2.Box({width: dimension[0], height: dimension[1]})
        shape.material = new p2.Material(Constant.BRICK_MATERIAL);
        shape.collisionGroup = Constant.BRICK_COLLISION_GROUP;
        shape.collisionMask = Constant.BALL_COLLISION_GROUP;
        this.body.addShape(shape);
    }
}
