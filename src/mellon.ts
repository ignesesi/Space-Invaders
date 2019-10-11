import * as PIXI from "pixi.js";
import { Settings } from "./settings";
import { GameObject } from "./game_object";

export class Mellon extends GameObject {
    public visible: boolean;
    public deltaR: number;

    constructor(stage: PIXI.Container, x: number = 0, y: number = 0) {
        super(stage, Settings.mellon, x, y);

        //this.pivot.set (0.5, 0.5);
        this.anchor.set (0.5, 0.5);
        this.deltaR = Settings.mellon.deltaR;

        this.remove(stage);

    }

    remove(stage: PIXI.Container){
        super.remove(stage);
        this.visible = false;
    }
}
