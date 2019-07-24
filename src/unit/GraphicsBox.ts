
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
    
    protected createBody() {
        this.body = new p2.Body({mass: this.mass});
        this.body.type = this.type;

        const lbVertex = [-this.width / 2, this.height / 2];
        const ctVertex = [0, -this.height / 2];
        const rbVertex = [this.width / 2, this.height / 2];
        const path = [lbVertex, ctVertex, rbVertex];
        this.body.fromPolygon(path);
    }

    protected createDisplay() {
        const x: number = this.borderThickness / 2;
        const y: number = this.borderThickness / 2;
        const width: number = this.width - this.borderThickness;
        const height: number = this.height - this.borderThickness;

        const skin = new egret.Sprite();
        skin.anchorOffsetX = this.width / 2;
        skin.anchorOffsetY = this.height / 2;
        
        skin.graphics.lineStyle(this.borderThickness, this.borderColor);
        skin.graphics.beginFill(this.color, this.alpha);
        skin.graphics.drawRect(x, y, width, height);
        skin.graphics.endFill();

        this.skin = skin;
        this.body.displays = [this.skin];
    }
    
    protected createShape() {        
        const shape = new p2.Box({width: this.width, height: this.height});

        this.shape = shape;
        this.body.addShape(this.shape);
    }
}
