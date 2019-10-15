import * as PIXI from "pixi.js";

export class Text extends PIXI.Text{
    public name: string;
    public value: number;

    constructor(obj: any){
        super("", obj.style)
        this.name = obj.name;
        this.value = obj.value;
        this.x = obj.x;
        this.y = obj.y;
        this.update();
    }

    public update() :void {
        this.text = this.name + this.value;
    }

    public reset(obj: any) :void {
        this.value = obj.value;
    }
}