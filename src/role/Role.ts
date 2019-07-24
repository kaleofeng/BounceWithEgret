
class Role {

    protected type: ERole;
    protected displayBody: DisplayBody;

    constructor(type: ERole) {
        this.type = type;
    }

    public getType(): ERole {
        return this.type;
    }
    
    public theBody(): p2.Body {
        return this.displayBody.body;
    }

    public theDisplay(): egret.DisplayObject {
        return this.displayBody.skin;
    }
}
