
class CircleBrick extends Brick {

    constructor(options: any) {
        super(options);
    }

    protected createDisplay() {
        const dimension: number[] = OptionHelper.dimension(this.options);
        const color: number = OptionHelper.color(this.options);
        const alpha: number = OptionHelper.alpha(this.options);

        const radius = dimension[0] / 2;
        const halfBorder: number = Constant.BORDER_THICKNESS / 2;

        this.anchorOffsetX = radius;
        this.anchorOffsetY = radius;

        this.graphics.lineStyle(Constant.BORDER_THICKNESS, 0x0000FF);
        this.graphics.beginFill(color, alpha);
        this.graphics.drawCircle(this.anchorOffsetX, this.anchorOffsetY, radius - halfBorder);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    protected createShape() {
        const dimension: number[] = OptionHelper.dimension(this.options);
        
        const radius = dimension[0] / 2;

        const shape = new p2.Circle({radius: radius});
        shape.material = new p2.Material(Constant.BRICK_MATERIAL);
        shape.collisionGroup = Constant.BRICK_COLLISION_GROUP;
        shape.collisionMask = Constant.BALL_COLLISION_GROUP;
        this.body.addShape(shape);
    }
}
