import * as PIXI from "pixi.js";
import { Settings } from "../settings";

export class Bunny_Cont extends PIXI.Container {
    public deltaX: number;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this.stage = stage;
        this.reset();
        this.stage.addChild(this);
    }

    public reset() :void {
        this.x = Settings.offset.width; 
        this.y = Settings.offset.height;
        this.deltaX = Settings.bunny_cont.deltaX;
    }

    public move() :void {
        this.x += this.deltaX;
        if(this.x <= 0 || this.x >= Settings.offset.width*2) {
            this.deltaX *= (-1);
            this.x += this.deltaX;
        }
    }
}
