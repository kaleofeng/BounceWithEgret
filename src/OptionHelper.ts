
class OptionHelper {
    
    public static getOptionPosition(options: any): number[] {
        return options.position !== undefined ? options.position : [0, 0];
    }
    
    public static getOptionMass(options: any): number {
        return options.mass !== undefined ? options.mass : 1;
    }
    
    public static getOptionColor(options: any): number {
        return options.color !== undefined ? options.color : 0x000000;
    }
    
    public static getOptionAlpha(options: any): number {
        return options.alpha !== undefined ? options.alpha : 1;
    }
    
    public static getOptionDimension(options: any): number[] {
        return options.dimension !== undefined ? options.dimension : [100, 100];
    }
    
    public static getOptionRadius(options: any): number {
        return options.radius !== undefined ? options.radius : 50;
    }
}