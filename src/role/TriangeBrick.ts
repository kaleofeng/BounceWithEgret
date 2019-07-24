
class TriangleBrick extends Brick {

    constructor(options: any) {
        super(options);
    }
    
    protected createBody() {
        super.createBody();

        const dimension: number[] = OptionHelper.dimension(this.options);

        const lbVertex = [-dimension[0] / 2, dimension[1] / 2];
        const ctVertex = [0, -dimension[1] / 2];
        const rbVertex = [dimension[0] / 2, dimension[1] / 2];
        const path = [lbVertex, ctVertex, rbVertex];
        this.body.fromPolygon(path);
    }

    protected createDisplay() {
        const dimension: number[] = OptionHelper.dimension(this.options);
        const color: number = OptionHelper.color(this.options);
        const alpha: number = OptionHelper.alpha(this.options);

        const halfBorder: number = Constant.BORDER_THICKNESS / 2;

        const shape = <p2.Convex>this.body.shapes[0];
        const vertices = shape.vertices;

        const offsetX = -vertices[0][0];
        const offsetY = -vertices[1][1];

        this.anchorOffsetX = offsetX;
        this.anchorOffsetY = offsetY;

        const lbVertex = [vertices[0][0] + offsetX + halfBorder, vertices[0][1] + offsetY - halfBorder];
        const ctVertex = [vertices[1][0] + offsetX,              vertices[1][1] + offsetY + halfBorder];
        const rbVertex = [vertices[2][0] + offsetX - halfBorder, vertices[2][1] + offsetY - halfBorder];

        this.graphics.lineStyle(Constant.BORDER_THICKNESS, 0x0000FF);
        this.graphics.beginFill(color, alpha);
        this.graphics.moveTo(lbVertex[0], lbVertex[1]);
        this.graphics.lineTo(ctVertex[0], ctVertex[1]);
        this.graphics.lineTo(rbVertex[0], rbVertex[1]);
        this.graphics.lineTo(lbVertex[0], lbVertex[1]);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    protected createShape() {
        const shape = this.body.shapes[0];
        shape.material = new p2.Material(Constant.BRICK_MATERIAL);
        shape.collisionGroup = Constant.BRICK_COLLISION_GROUP;
        shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }
}
