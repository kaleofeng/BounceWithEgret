
class ImageBox extends DisplayBody {

    private textureName: string;

    constructor(options: any) {
        super(options);
        this.textureName = OptionHelper.textureName(options);
    }

    protected createBody() {
        this.body = new p2.Body({mass: this.mass});
        this.body.type = this.type;
    }

    protected createDisplay() {
        const skin = new egret.Bitmap();
        skin.texture = RES.getRes(this.textureName);
        skin.anchorOffsetX = skin.texture.textureWidth / 2;
        skin.anchorOffsetY = skin.texture.textureHeight / 2;

        this.width = skin.texture.textureWidth;
        this.height = skin.texture.textureHeight;

        this.skin = skin;
        this.body.displays = [this.skin];
    }
    
    protected createShape() {
        const shape = new p2.Box({width: this.width, height: this.height})

        this.shape = shape;
        this.body.addShape(this.shape);
    }
}
