
import { View } from "./view";

export class Anim321 extends View {
    public x: number;
    public y: number;
    public duration: number;
    public texture: string[];

    constructor(w: number, h: number, x: number, y: number, d: number) {
        super(w, h);
        this.x = x;
        this.y = y;
        this.duration = d;
        this.texture = [];
        for(let i = 3; i >= 0; i --) {
            //console.log("WTF");
            this.texture.push("0123456789 " + i + ".ase");
        }
    }
}