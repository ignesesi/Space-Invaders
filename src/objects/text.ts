import * as PIXI from "pixi.js";

export class Text extends PIXI.Text{
    public name: string;
    public value: number;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container, obj: any){
        super("", obj.style)
        this.stage = stage;
        this.name = obj.name;
        this.value = obj.value;
        this.x = obj.x;
        this.y = obj.y;
        this.update();
        this.stage.addChild(this);
    }

    public update() :void {
        this.text = this.name + this.value;
    }

    public reset(obj: any) :void {
        this.value = obj.value;
    }
}