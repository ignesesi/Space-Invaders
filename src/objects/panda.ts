import * as PIXI from "pixi.js";
import { Settings } from "../settings";
import { GameObject } from "./game_object";

export class Panda extends GameObject {
/* 
    public lives: number;
    public score: number;
*/
    constructor(stage: PIXI.Container) {
        super(stage, Settings.panda);
        this.interactive = true;
        this.reset();
    }

    public reset() :void {
        this.deltaX = 0;
        super.reset(Settings.panda.x, Settings.panda.y);
    }
}