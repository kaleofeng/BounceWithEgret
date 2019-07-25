
class ImageCircle extends DisplayBody {

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

        this.width = skin.texture.textureWidth;
        this.height = skin.texture.textureHeight;

        this.display = new egret.DisplayObjectContainer();
        this.display.anchorOffsetX = this.width / 2;
        this.display.anchorOffsetY = this.height / 2;
        this.display.addChild(skin);
        this.body.displays = [this.display];
    }
    
    protected createShape() {
        this.shape = new p2.Circle({radius: this.width / 2});
        this.body.addShape(this.shape);
    }
}
