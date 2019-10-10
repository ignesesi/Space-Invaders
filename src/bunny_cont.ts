import * as PIXI from "pixi.js";
import { Settings } from "./settings";

export class Bunny_Cont extends PIXI.Container {
    public deltaX: number;

    constructor(stage: PIXI.Container) {
        super();
        
        this.x = Settings.offset.width; 
        this.y = Settings.offset.height;
        this.deltaX = Settings.bunny_cont.deltaX;

        stage.addChild(this);
    }
}
