import * as PIXI from "pixi.js";
import { View } from "./view";

export class Button extends View{
    style: PIXI.TextStyle;
    graphics: PIXI.Graphics; 

    constructor(w: number, h: number, x:number, y: number, line_color: number, fill_color: number, st: PIXI.TextStyle, fs: number){
        super(w, h);
        this.style = new PIXI.TextStyle(st);
        this.style.fontSize = String(fs + 'px');

        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(3,line_color);
        this.graphics.beginFill(fill_color);
        this.graphics.drawEllipse(x, y, w, h);
        this.graphics.endFill();
    }
}