
class MathHelper {

    public static randomInteger(min: number, max: number): number {
        const randValue = Math.round(Math.random() * Number.MAX_VALUE) % Math.round(max - min + 1);
        return min + randValue;
    }

    public static randomPortions(total: number, count: number, minRatio: number, maxRatio: number): number[] {
        const portions: number[] = [];
        const min = Math.floor(total * minRatio);
        total -= min * count;
        for (let i = 0; i < count - 1; ++i) {
            const max = Math.floor(total * (maxRatio - minRatio));
            const value = this.randomInteger(0, max);
            portions.push(min + value);
            total -= value;
        }
        portions.push(min + total);
        return portions;
    }

    public static calAxisDivide(x: number, y: number, value: number): number[] {
        const p1 = Math.pow(x, 2) + Math.pow(y, 2);
        const p2 = Math.pow(value, 2);
        const factor = Math.sqrt(p2 / p1);
        return [x * factor, y * factor];        
    }
}
