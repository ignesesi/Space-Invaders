import * as PIXI from "pixi.js";
import { Settings } from "./settings";
import { GameObject } from "./game_object";

export class Bunny extends GameObject {
    public price: number;

    constructor(stage: PIXI.Container, i:number, j:number) {
        const x = j * Settings.init.width + (Settings.bunny.spacing / 2); 
        const y = i * Settings.init.height + (Settings.bunny.spacing / 2);
        //console.log("Bunny: ", x, y, i, j, Settings.bunny.width, Settings.bunny.height, Settings.bunny.spacing);
        super(stage, Settings.bunny, x, y);

        this.tint = Settings.bunny.tints[i];
        this.price = i;
    }
}
