
class Line extends egret.Sprite {

    private distance: number;
    private thickness: number;
    private color: number;
    private gap: number;

    constructor(options: any) {
        super();
        this.distance = OptionHelper.distance(options);
        this.thickness = OptionHelper.thickness(options);
        this.color = OptionHelper.color(options);
        this.gap = OptionHelper.gap(options);
    }

    public setup() {
        this.createDisplay();
    }

    public show() {
        this.alpha = 1;
    }

    public hide() {
        this.alpha = 0;
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public updateDirection(targetX: number, targetY: number) {
        const deltaX = targetX - this.x;
        const deltaY = targetY - this.y;
        const angle = MathHelper.calAxisAngle(deltaX, deltaY);
        this.rotation = -MathHelper.angleToRotation(angle);
    }

    private createDisplay() {
        this.graphics.lineStyle(this.thickness, this.color);
        this.graphics.beginFill(this.color, 1);
        
        let distance = 0;
        while (distance < this.distance) {
            this.graphics.moveTo(0, distance);
            distance += this.gap;
            distance = Math.min(distance, this.distance);
            this.graphics.lineTo(0, distance);
            distance += this.gap;
        }

        this.graphics.endFill();
    }
}
