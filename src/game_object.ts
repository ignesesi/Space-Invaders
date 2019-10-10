import * as PIXI from "pixi.js";
import { Settings } from "./settings";

export class GameObject extends PIXI.Sprite {
    public deltaX: number;
    public deltaY: number;

    constructor(stage: PIXI.Container, obj: any, name: string = "", x: number = 0, y: number = 0) {
        super(PIXI.Texture.from(name+".png"));
        //stage.addChild(panda);
        //Settings[name].width
        
        this.width = obj.width;
        this.height = obj.height;
        this.x = x;
        this.y = y;
        this.deltaX = obj.deltaX;
        this.deltaY = obj.deltaY;
        stage.addChild(this);
    }

    get centerX(){
        if(this.anchor.x == 0) {
            return this.getGlobalPosition().x + this.width / 2
        }
        //console.warn("XXX");
        return this.getGlobalPosition().x;
    }

    get centerY(){
        if(this.anchor.y == 0) {
            return this.getGlobalPosition().y + this.height / 2
        }
        //console.warn("XXX");
        return this.y;
    }

    areColliding(obj: GameObject) {
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        hit = false;

        vx = this.centerX - obj.centerX;
        vy = this.centerY - obj.centerY;
        
        combinedHalfWidths = (this.width + obj.width) / 2;
        combinedHalfHeights = (this.height + obj.height) / 2;
        
        if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit = false;
            }
        } else {
            hit = false;
        }
        return hit;
    }

    remove(stage: PIXI.Container){
        this.x = Settings.game.width;
        this.y = Settings.game.height;
        stage.removeChild(this);
    }
}