import * as PIXI from "pixi.js";
import { Settings } from "./settings";
import { GameObject } from "./game_object";

export class Carrot extends GameObject {
    public lives: number;

    constructor(stage: PIXI.Container) {
        super(stage, Settings.carrot);
        this.x = this.newX();
        this.y = this.newY();
    }

    newX() :number {
        const j = Math.floor(Math.random() * Settings.bunny_cont.cols);
        const x = j * Settings.init.width + (Settings.bunny.spacing / 2); 
        return Settings.offset.width + x;
    }
    newY() :number {
        const i = Math.floor(Math.random() * Settings.bunny_cont.rows); 
        const y = i * Settings.init.height + (Settings.bunny.spacing / 2);  
        return Settings.offset.height + y;
    }
}
