
class GraphicsBox extends DisplayBody {

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
        const x: number = this.borderThickness / 2;
        const y: number = this.borderThickness / 2;
        const width: number = this.width - this.borderThickness;
        const height: number = this.height - this.borderThickness;

        const skin = new egret.Sprite();
        skin.graphics.lineStyle(this.borderThickness, this.borderColor);
        skin.graphics.beginFill(this.color, this.alpha);
        skin.graphics.drawRect(x, y, width, height);
        skin.graphics.endFill();

        this.display = new egret.DisplayObjectContainer();
        this.display.anchorOffsetX = this.width / 2;
        this.display.anchorOffsetY = this.height / 2;
        this.display.addChild(skin);
        this.body.displays = [this.display];
    }
    
    protected createShape() {        
        this.shape = new p2.Box({width: this.width, height: this.height});
        this.body.addShape(this.shape);
    }
}
