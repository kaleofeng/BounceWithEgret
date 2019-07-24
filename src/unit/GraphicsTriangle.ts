
class GraphicsTriangle extends DisplayBody {

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
        const shape = <p2.Convex>this.body.shapes[0];
        const vertices = shape.vertices;

        const offsetX = -vertices[0][0];
        const offsetY = -vertices[1][1];

        const skin = new egret.Sprite();
        skin.anchorOffsetX = offsetX;
        skin.anchorOffsetY = offsetY;

        const halfBorder: number = this.borderThickness / 2;
        const lbVertex = [vertices[0][0] + offsetX + halfBorder, vertices[0][1] + offsetY - halfBorder];
        const ctVertex = [vertices[1][0] + offsetX,              vertices[1][1] + offsetY + halfBorder];
        const rbVertex = [vertices[2][0] + offsetX - halfBorder, vertices[2][1] + offsetY - halfBorder];

        skin.graphics.lineStyle(this.borderThickness, this.borderColor);
        skin.graphics.beginFill(this.color, this.alpha);
        skin.graphics.moveTo(lbVertex[0], lbVertex[1]);
        skin.graphics.lineTo(ctVertex[0], ctVertex[1]);
        skin.graphics.lineTo(rbVertex[0], rbVertex[1]);
        skin.graphics.lineTo(lbVertex[0], lbVertex[1]);
        skin.graphics.endFill();

        this.skin = skin;
        this.body.displays = [this.skin];
    }
    
    protected createShape() {
        const shape = <p2.Convex>this.body.shapes[0];

        this.shape = shape;
    }
}
