
class BoxBrick extends Brick {

    constructor(options: any) {
        super(options);
    }

    protected createShape() {
        const dimension: number[] = this.getOptionDimension();

        this.shape = new p2.Box({width: dimension[0], height: dimension[1]})
        this.shape.material = this.material;
        this.body.addShape(this.shape);
    }

    protected createDisplay() {
        const dimension: number[] = this.getOptionDimension();
        const color: number = this.getOptionColor();
        const alpha: number = this.getOptionAlpha();

        const thickness: number = Constant.BORDER_THICKNESS;
        const x: number = Constant.BORDER_THICKNESS / 2;
        const y: number = Constant.BORDER_THICKNESS / 2;
        const width: number = dimension[0] - Constant.BORDER_THICKNESS;
        const height: number = dimension[1] - Constant.BORDER_THICKNESS;

        this.anchorOffsetX = dimension[0] / 2;
        this.anchorOffsetY = dimension[1] / 2;
        this.graphics.lineStyle(thickness, 0x00FF00);
        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(x, y, width, height);
        this.graphics.endFill();
        this.body.displays = [this];
    }

    private getOptionDimension(): number[] {
        return this.options.dimension !== undefined ? this.options.dimension : [100, 100];
    }
    
    private getOptionColor(): number {
        return this.options.color !== undefined ? this.options.color : 0x000000;
    }
    
    private getOptionAlpha(): number {
        return this.options.alpha !== undefined ? this.options.alpha : 1;
    }
}
