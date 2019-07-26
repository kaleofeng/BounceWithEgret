
class MathHelper {

    public static randomInteger(min: number, max: number): number {
        const randValue = Math.round(Math.random() * Number.MAX_VALUE) % Math.round(max - min + 1);
        return min + randValue;
    }

    public static randomPortions(total: number, count: number, minRatio: number, maxRatio: number): number[] {
        const portions: number[] = [];
        const min = Math.max(Math.floor(total * minRatio), 1);
        total -= min * count;
        for (let i = 0; i < count - 1 && total >= 0; ++i) {
            const max = Math.floor(total * (maxRatio - minRatio));
            const value = this.randomInteger(0, max);
            portions.push(min + value);
            total -= value;
        }
        portions.push(min + total);
        return portions;
    }

    public static randomValues(values: number[], count: number): number[] {
        const result = values.slice(0);
        let removeCount = result.length - count;
        while (removeCount-- > 0) {
            const index = this.randomInteger(0, result.length - 1);
            result.splice(index, 1);
        }
        return result;
    }

    public static angleToRotation(angle: number): number {
        return angle * 180 / Math.PI;
    }

    public static rotationToAngle(rotation: number): number {
        return rotation * Math.PI / 180;
    }

    public static calAxisAngle(x: number, y: number): number {
        return Math.atan2(x, y);  
    }

    public static calAxisDivide(x: number, y: number, value: number): number[] {
        const angle = Math.atan2(x, y);
        return [value * Math.sin(angle), value * Math.cos(angle)];        
    }

    public static calVelocityPower(velocity: number[]): number {
        return Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2);
    }
}
