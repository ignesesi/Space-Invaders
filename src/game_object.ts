import * as PIXI from "pixi.js";
import { Settings } from "./settings";

export class GameObject extends PIXI.Sprite {
    public deltaX: number;
    public deltaY: number;

    constructor(stage: PIXI.Container, obj: any, x: number = 0, y: number = 0) {
        super(PIXI.Texture.from(obj.texture));
        //stage.addChild(panda);
        //Settings[name].width
        this.width = obj.width;
        this.height = obj.height;
        this.deltaX = obj.deltaX;
        this.deltaY = obj.deltaY;

        this.reset(x, y);

        stage.addChild(this);
    }

    get centerX() :number {
        if(this.anchor.x == 0) {
            return this.getGlobalPosition().x + this.width / 2
        }
        //console.warn("XXX");
        return this.getGlobalPosition().x;
    }

    get centerY() :number {
        if(this.anchor.y == 0) {
            return this.getGlobalPosition().y + this.height / 2
        }
        //console.warn("XXX");
        return this.y;
    }

    public areColliding(obj: GameObject) :boolean {
        const vx = this.centerX - obj.centerX;
        const vy = this.centerY - obj.centerY;
        
        const combinedHalfWidths = (this.width + obj.width) / 2;
        const combinedHalfHeights = (this.height + obj.height) / 2;
        
        if (Math.abs(vx) <= combinedHalfWidths) {
            if (Math.abs(vy) <= combinedHalfHeights) {
                return true;
            } else {
                return false
            }
        } 
        return false;
    }

    public remove(stage: PIXI.Container) :void {
        this.reset(Settings.game.width, Settings.game.height);
        stage.removeChild(this);
    }

    public reset(x: number = 0, y: number = 0) :void {
        this.x = x;
        this.y = y;
    }
}