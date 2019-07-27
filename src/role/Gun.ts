
class Gun extends egret.DisplayObjectContainer {

    private gunBody: egret.Bitmap;
    private gunMuzzle: egret.Bitmap;
    private textField: egret.TextField;
    private angle: number = 0;

    constructor() {
        super();
    }

    public setup() {
        this.createGunMuzzle();
        this.createGunBody();
        this.createTextField();
        this.adjustSize();
    }

    public fire() {
        egret.Tween.get(this.gunMuzzle).to({scaleY: 0.75}, 100).to({scaleY: 1}, 100);
    }

    public updateDirection(targetX: number, targetY: number) {
        const deltaX = targetX - this.x;
        const deltaY = targetY - this.y;
        this.angle = MathHelper.calAxisAngle(deltaX, deltaY);
        this.gunMuzzle.rotation = -MathHelper.angleToRotation(this.angle);
    }

    public updateBulletNumber(number: number) {
        this.textField.text = number.toString(10);
    }

    public getBulletPostion(): number[] {
        const startX = 0;
        const startY = this.gunMuzzle.y;

        const gunMuzzleLength = this.gunMuzzle.texture.textureHeight;
        const offsetX = gunMuzzleLength * Math.sin(this.angle);
        const offsetY = gunMuzzleLength * Math.cos(this.angle);

        const posX = startX + offsetX;
        const posY = startY + offsetY;

        return [this.x + posX * this.scaleX, this.y + posY * this.scaleY];
    }

    private createGunMuzzle() {
        this.gunMuzzle = new egret.Bitmap();
        this.gunMuzzle.texture = RES.getRes("gun_muzzle_png");
        this.addChild(this.gunMuzzle);
    }

    private createGunBody() {
        this.gunBody = new egret.Bitmap();
        this.gunBody.texture = RES.getRes("gun_body_png");
        this.addChild(this.gunBody);
    }

    protected createTextField() {
        this.textField = new egret.TextField();
        this.textField.text = "";
        this.textField.size = 28;
        this.textField.textColor = 0xFFFFFF;
        this.textField.fontFamily = "KaiTi";
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textField.border = true;
        this.textField.width = 60;
        this.textField.height = 40;
        this.addChild(this.textField);
    }

    private adjustSize() {
        this.gunBody.anchorOffsetX = this.gunBody.texture.textureWidth / 2;
        this.gunBody.anchorOffsetY = 0;
        this.gunBody.x = this.gunBody.texture.textureWidth / 2;
        this.gunBody.y = 0;

        this.gunMuzzle.anchorOffsetX = this.gunMuzzle.texture.textureWidth / 2;
        this.gunMuzzle.anchorOffsetY = 0;
        this.gunMuzzle.x = this.gunBody.texture.textureWidth / 2;
        this.gunMuzzle.y = this.gunBody.texture.textureHeight / 2;

        this.textField.anchorOffsetX = this.textField.width / 2;
        this.textField.anchorOffsetY = this.textField.height / 2;
        this.textField.x = this.gunBody.texture.textureWidth / 2;
        this.textField.y = this.gunBody.texture.textureHeight / 2;
        
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = 0;
    }
}
