
class Ground extends egret.Sprite {

    private options: any;
    private role: ERole;

    private body: p2.Body;

    constructor(options: any) {
        super();
        this.options = options;
        this.role = ERole.GROUND;
        this.setup();
    }

    public theBody(): p2.Body {
        return this.body;
    }

    private setup() {
        this.createBody();
        this.createDisplay();
        this.createShape();
    }

    private createBody() {
        const mass: number = OptionHelper.getOptionMass(this.options);
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);
    
        this.body = new p2.Body({mass: mass});
        this.body.type = p2.Body.STATIC;
        this.body.userData = this;
    
        const lbVertex = [-dimension[0] / 2, dimension[1] / 2];
        const ctVertex = [0, -dimension[1] / 2];
        const rbVertex = [dimension[0] / 2, dimension[1] / 2];
        const path = [lbVertex, ctVertex, rbVertex];
        this.body.fromPolygon(path);
    }

    private createDisplay() {
        const dimension: number[] = OptionHelper.getOptionDimension(this.options);
        const color: number = OptionHelper.getOptionColor(this.options);
        const alpha: number = OptionHelper.getOptionAlpha(this.options);

        const shape = <p2.Convex>this.body.shapes[0];
        const vertices = shape.vertices;

        const offsetX = -vertices[0][0];
        const offsetY = -vertices[1][1];

        this.anchorOffsetX = offsetX;
        this.anchorOffsetY = offsetY;
        
        const lbVertex = [vertices[0][0] + offsetX, vertices[0][1] + offsetY];
        const ctVertex = [vertices[1][0] + offsetX, vertices[1][1] + offsetY];
        const rbVertex = [vertices[2][0] + offsetX, vertices[2][1] + offsetY];

        this.graphics.beginFill(color, alpha);
        this.graphics.moveTo(lbVertex[0], lbVertex[1]);
        this.graphics.lineTo(ctVertex[0], ctVertex[1]);
        this.graphics.lineTo(rbVertex[0], rbVertex[1]);
        this.graphics.lineTo(lbVertex[0], lbVertex[1]);
        this.graphics.endFill();
        this.body.displays = [this];
    }
    
    private createShape() {
        const shape = <p2.Convex> this.body.shapes[0];
        shape.material = new p2.Material(Constant.GROUND_MATERIAL);
        shape.collisionGroup = Constant.GROUND_COLLISION_GROUP;
        shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }
}
