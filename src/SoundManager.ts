
class SoundManager {

    public static FLOOR: string = "floor_mp3";
    public static FIRE: string = "fire_mp3";
    public static HIT: string = "hit_mp3";

    private static sounds: any = {}

    public static setup() {
        this.sounds[SoundManager.FLOOR] = RES.getRes(SoundManager.FLOOR);
        this.sounds[SoundManager.FIRE] = RES.getRes(SoundManager.FIRE);
        this.sounds[SoundManager.HIT] = RES.getRes(SoundManager.HIT);
    }

    public static play(name: string) {
        const sound = <egret.Sound>this.sounds[name];
        sound.play(0, 1);
    }
}
