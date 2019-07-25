
class Brick extends Role {

    private style: number = 0;
    protected number: number = 0;
    protected textField : egret.TextField;

    constructor(options: any) {
        super(ERole.BRICK, options);
        this.style = OptionHelper.style(options);
    }

    public getNumber(): number {
        return this.number;
    }

    public setNumber(number: number) {
        this.number = number;
        this.textField.text = this.number.toString(10);
    }

    public setup() {
        this.createDisplayBody();
        this.createText();
    }

    public sync() {
        super.sync();
        this.textField.rotation = -this.displayBody.display.rotation;
    }

    protected createDisplayBody() {
        switch (this.style) {
            case EBrick.CIRCLE:
                this.displayBody = new GraphicsCircle(this.options);
                break;
            case EBrick.TRIANGLE:
                this.displayBody = new GraphicsTriangle(this.options);
                break;
            default:
                this.displayBody = new GraphicsBox(this.options);
        }
        
        this.displayBody.setup();
        this.displayBody.body.userData = this;
        this.displayBody.shape.material = new p2.Material(Constant.BRICK_MATERIAL);
        this.displayBody.shape.collisionGroup = Constant.BRICK_COLLISION_GROUP;
        this.displayBody.shape.collisionMask = Constant.BALL_COLLISION_GROUP;
    }

    protected createText() {
        this.textField = new egret.TextField();
        this.textField.text = this.number.toString(10);
        this.textField.size = 18;
        this.textField.textColor = 0xFFFFFF;
        this.textField.fontFamily = "KaiTi";
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textField.border = true;
        this.textField.width = 60;
        this.textField.height = 40;
        this.textField.anchorOffsetX = this.textField.width / 2;
        this.textField.anchorOffsetY = this.textField.height / 2;
        this.textField.x = this.display().width / 2;
        this.textField.y = this.display().height / 2;
        this.display().addChild(this.textField);
    }
}
