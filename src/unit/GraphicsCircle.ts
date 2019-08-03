
class GraphicsCircle extends DisplayBody {

    protected color: number;
    protected alpha: number;
    protected borderThickness: number;
    protected borderColor: number;

    constructor(options: any) {
        super(options);
        this.color = OptionHelper.color(options);
        this.alpha = OptionHelper.alpha(options);
        this.borderThickness = OptionHelper.borderThickness(options);
        this.borderColor = OptionHelper.borderColor(options);
    }
    
    public anchorRatio(): number[] {
        return [1 / 2, 1 / 2];
    }

    protected createBody() {
        this.body = new p2.Body({mass: this.mass});
        this.body.type = this.type;
    }

    protected createDisplay() {
        const radius = this.width / 2;
        const halfBorder: number = this.borderThickness / 2;

        const skin = new egret.Sprite();
        skin.graphics.lineStyle(this.borderThickness, this.borderColor);
        skin.graphics.beginFill(this.color, this.alpha);
        skin.graphics.drawCircle(radius, radius, radius - halfBorder);
        skin.graphics.endFill();

        this.display = new egret.DisplayObjectContainer();
        this.display.anchorOffsetX = radius;
        this.display.anchorOffsetY = radius;
        this.display.addChild(skin);
        this.body.displays = [this.display]; 
    }
    
    protected createShape() {
        const radius = this.width / 2;

        this.shape = new p2.Circle({radius: radius});
        this.body.addShape(this.shape);
    }
}
