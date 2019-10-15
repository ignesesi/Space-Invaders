import * as PIXI from "pixi.js";
import { Settings } from "../settings";
import { GameObject } from "./game_object";

export class Mellon extends GameObject {
    public visible: boolean;
    public deltaR: number;

    constructor(stage: PIXI.Container, x: number = 0, y: number = 0) {
        super(stage, Settings.mellon, x, y);

        //this.pivot.set (0.5, 0.5);
        this.anchor.set (0.5, 0.5);
        this.deltaR = Settings.mellon.deltaR;

        this.remove();

    }

    public remove() :void {
        super.remove();
        this.visible = false;
    }

    public reset() :void {
        this.remove();
    }

    public add(x: number, y: number) :void {
        super.reset(x,y);
        this.visible = true;
        this.stage.addChild(this);
    }

    public move() :void {
        this.y += this.deltaY;
        this.rotation += this.deltaR;
        if(this.y + this.height <= 0) {
            this.remove();
        }        
    }
}
