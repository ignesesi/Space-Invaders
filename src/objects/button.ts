import * as PIXI from "pixi.js";
import { Settings } from "../settings";

export class Button extends PIXI.Container{
    public play: PIXI.Graphics;
    private text: PIXI.Text;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container){
        super();
        this.stage = stage;
        this.play = Settings.button.graphics;
        this.play.interactive = true;
        this.play.buttonMode = true;
        this.addChild(this.play);
        
        const style = Settings.button.style;
        this.text = new PIXI.Text("", style);
        this.addChild(this.text);
    }

    public add(text: string) :void {
        //console.log(text);
        this.text.text = text;
        this.text.x = (Settings.game.width - this.text.width) / 2;
        this.text.y = (Settings.game.height - this.text.height) / 2;
        //console.warn(this.text.text);
        this.stage.addChild(this);
    }
}
