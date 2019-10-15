
import * as PIXI from "pixi.js";
import { Settings } from "../settings";

export class Explosion extends PIXI.AnimatedSprite {

    constructor(stage: PIXI.Container){
        const texture = [];
        for (let i = 0; i < Settings.explosion.length; i++) {
            texture.push(PIXI.Texture.from(Settings.explosion.texture[i]));
        }
        super(texture);
        this.loop = false;
        this.anchor.set(0, 0);
        this.pivot.set(0, 0);
        //this.scale.set(2,2);
        this.width = Settings.explosion.width;
        this.height = Settings.explosion.height;
        this.animationSpeed = Settings.explosion.speed;
        this.gotoAndStop(Settings.explosion.length - 1);
        stage.addChild(this);
    }

    add(x: number, y: number) :void {
        this.x = x;
        this.y = y;
        this.gotoAndPlay(0);
    }
}