
class Box {

    private material: p2.Material;
    private shape: p2.Box;
    private body: p2.Body;
    private skin: egret.Sprite;

    constructor(options: any) {
        const position: number[] = options.position !== undefined ? options.position : [0, 0];
        const dimension: number[] = options.dimension !== undefined ? options.dimension : [100, 100];
        const mass: number = options.mass !== undefined ? options.mass : 1;
        const color: number = options.color !== undefined ? options.color : 0xFF0000;
        const alpha: number = options.alpha !== undefined ? options.alpha : 1;

        this.createMaterial();
        this.createShape(dimension);
        this.createBody(position, mass);
        this.createSkin(dimension, color, alpha);
    }

    public theMaterial(): p2.Material {
        return this.material;
    }

    public theShape(): p2.Box {
        return this.shape;
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public theSkin(): egret.Sprite {
        return this.skin;
    }

    private createMaterial() {
        this.material = new p2.Material(Constant.BOX_MATERIAL);
    }

    private createShape(dimension: number[]) {
        this.shape = new p2.Box({width: dimension[0], height: dimension[1]})
        this.shape.material = this.material;
    }

    private createBody(position: number[], mass: number) {
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.STATIC;
        this.body.addShape(this.shape);
    }

    private createSkin(dimension: number[], color: number, alpha: number) {
        this.skin = new egret.Sprite();
        this.skin.anchorOffsetX = dimension[0] / 2;
        this.skin.anchorOffsetY = dimension[1] / 2;
        this.skin.graphics.beginFill(color, alpha);
        this.skin.graphics.drawRect(0, 0, dimension[0], dimension[1]);
        this.skin.graphics.endFill();
        this.body.displays = [this.skin];
    }
}
