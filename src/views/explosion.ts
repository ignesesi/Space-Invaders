import * as PIXI from "pixi.js";

import { View } from "./view";

export class Explosion extends View{
    texture: string[];
    speed: number;
    length: number;
    constructor(w: number, h: number, sp: number, l: number){
        super(w, h);
        this.texture = [];
        for (let i = 0; i < 26; i++) {
            this.texture.push(`Explosion_Sequence_A ${i + 1}.png`);
        }
        this.speed = sp;
        this.length = l;
    }
}