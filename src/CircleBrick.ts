
class CircleBrick extends Brick {

    constructor(options: any) {
        super(options);
    }

    protected createDisplay() {
        const radius: number = OptionHelper.getOptionRadius(this.options);
        const color: number = OptionHelper.getOptionColor(this.options);
        const alpha: number = OptionHelper.getOptionAlpha(this.options);

        const radiusBorder: number = Constant.BORDER_THICKNESS / 2;

        this.anchorOffsetX = radius;
        this.anchorOffsetY = radius;
        this.graphics.lineStyle(Constant.BORDER_THICKNESS, 0x0000FF);
        this.graphics.beginFill(color, alpha);
        this.graphics.drawCircle(this.anchorOffsetX, this.anchorOffsetY, radius - radiusBorder);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    protected createShape() {
        const radius: number = OptionHelper.getOptionRadius(this.options);

        this.shape = new p2.Circle({radius: radius});
        this.shape.material = new p2.Material(Constant.BRICK_MATERIAL);;
        this.body.addShape(this.shape);
    }
}
