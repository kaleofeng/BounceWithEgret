
class Brick extends egret.Sprite {

    protected options: any;

    protected material: p2.Material;
    protected body: p2.Body;
    protected shape: p2.Shape;
    protected textField : egret.TextField;

    protected number: number = 0;

    constructor(options: any) {
        super();
        this.options = options;
        this.setup();
    }

    public setup() {
        this.createMaterial();
        this.createBody();
        this.createShape();
        this.createDisplay();
        this.createText();
    }

    public theMaterial(): p2.Material {
        return this.material;
    }

    public theShape(): p2.Shape {
        return this.shape;
    }

    public theBody(): p2.Body {
        return this.body;
    }

    public getNumber(): number {
        return this.number;
    }

    public setNumber(number: number) {
        this.number = number;
    }

    protected createMaterial() {
        this.material = new p2.Material(Constant.BRICK_MATERIAL);
    }

    protected createBody() {
        const position: number[] = OptionHelper.getOptionPosition(this.options);
        const mass: number = OptionHelper.getOptionMass(this.options);
    
        this.body = new p2.Body({position: position, mass: mass});
        this.body.type = p2.Body.DYNAMIC;
    }

    protected createShape() {

    }

    protected createDisplay() {
       
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
        this.textField.x = this.width / 2;
        this.textField.y = this.height / 2;
        this.addChild(this.textField);
    }
}
