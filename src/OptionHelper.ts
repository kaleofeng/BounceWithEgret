
class OptionHelper {
    
    public static position(options: any, defaultValue: number[] = [0, 0]): number[] {
        return options.position !== undefined ? options.position : defaultValue;
    }
        
    public static dimension(options: any, defaultValue: number[] = [100, 100]): number[] {
        return options.dimension !== undefined ? options.dimension : defaultValue;
    }

    public static type(options: any, defaultValue: number = 0): number {
        return options.type !== undefined ? options.type : defaultValue;
    }

    public static mass(options: any, defaultValue: number = 1): number {
        return options.mass !== undefined ? options.mass : defaultValue;
    }
    
    public static width(options: any, defaultValue: number = 100): number {
        return options.width !== undefined ? options.width : defaultValue;
    }
    
    public static height(options: any, defaultValue: number = 100): number {
        return options.height !== undefined ? options.height : defaultValue;
    }
    
    public static color(options: any, defaultValue: number = 0xFF0000): number {
        return options.color !== undefined ? options.color : defaultValue;
    }
    
    public static alpha(options: any, defaultValue: number = 1): number {
        return options.alpha !== undefined ? options.alpha : defaultValue;
    }

    public static borderThickness(options: any, defaultValue: number = 4): number {
        return options.borderThickness !== undefined ? options.borderThickness : defaultValue;
    }

    public static borderColor(options: any, defaultValue: number = 0x0000FF): number {
        return options.borderColor !== undefined ? options.borderColor : defaultValue;
    }

    public static textureName(options: any, defaultValue: string = "TEXTURE"): string {
        return options.textureName !== undefined ? options.textureName : defaultValue;
    }
    
    public static style(options: any, defaultValue: number = 0): number {
        return options.style !== undefined ? options.style : defaultValue;
    }
}
