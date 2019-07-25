
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
    
    protected createDisplayBody() {
    
    }
}
