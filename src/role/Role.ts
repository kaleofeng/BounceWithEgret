
class Role {

    protected type: ERole;
    protected options: any;
    protected displayBody: DisplayBody;

    constructor(type: ERole, options: any) {
        this.type = type;
        this.options = options;
    }

    public getType(): ERole {
        return this.type;
    }
    
    public body(): p2.Body {
        return this.displayBody.body;
    }

    public display(): egret.DisplayObjectContainer {
        return this.displayBody.display;
    }
    
    public setup() {
        this.createDisplayBody();
    }
    
    public sync() {
        this.displayBody.display.x = this.displayBody.body.position[0];
        this.displayBody.display.y = this.displayBody.body.position[1];
        this.displayBody.display.rotation = this.displayBody.body.angle * 180 / Math.PI;
    }
    
    protected createDisplayBody() {
    
    }
}
