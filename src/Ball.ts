
class Ball {

    private material: p2.Material;
    private shape: p2.Circle;
    private body: p2.Body;
    private skin: egret.Sprite;

    constructor(options: any) {
        const position: number[] = options.position !== undefined ? options.position : [0, 0];
        const radius: number = options.radius !== undefined ? options.radius : 20;
        const mass: number = options.mass !== undefined ? options.mass : 1;
        const color: number = options.color !== undefined ? options.color : 0x0000FF;
        const alpha: number = options.alpha !== undefined ? options.alpha : 1;

        this.createMaterial();
        this.createShape(radius);
        this.createBody(position, mass);
        this.createSkin(radius, color, alpha);
    }

    public theMaterial(): p2.Material {
        return this.material;
    }

    public theShape(): p2.Circle {
        return this.shape;
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public theSkin(): egret.Sprite {
        return this.skin;
    }

    private createMaterial() {
        this.material = new p2.Material(Constant.BALL_MATERIAL);
    }

    private createShape(radius: number) {
        this.shape = new p2.Circle({radius: radius});
        this.shape.material = this.material;
    }

    private createBody(position: number[], mass: number) {
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
        this.body.addShape(this.shape);
    }

    private createSkin(radius: number, color: number, alpha: number) {
        this.skin = new egret.Sprite();
        this.skin.anchorOffsetX = radius;
        this.skin.anchorOffsetY = radius;
        this.skin.graphics.beginFill(color, alpha);
        this.skin.graphics.drawCircle(this.skin.anchorOffsetX, this.skin.anchorOffsetY, radius);
        this.skin.graphics.endFill();
        this.body.displays = [this.skin];
    }
}
