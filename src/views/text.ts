import * as PIXI from "pixi.js";

export class Text{
    public name: string;
    public value: number;
    public style: PIXI.TextStyle;
    public x: number;
    public y: number;

    constructor(n: string, v: number, st: PIXI.TextStyle, x: number, y: number){
        this.name = n;
        this.value = v;
        this.style = new PIXI.TextStyle(st);
        this.x = x;
        this.y = y;
    }
    
}