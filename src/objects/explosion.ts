
import * as PIXI from "pixi.js";
import { Settings } from "../settings";

export class Explosion{
    texture: PIXI.Texture[];
    stage: PIXI.Container;

    constructor(stage: PIXI.Container){
        this.texture = [];
        for (let i = 0; i < Settings.explosion.length; i++) {
            this.texture.push(PIXI.Texture.from(Settings.explosion.texture[i]));
        }
        this.stage = stage;
    }

    add(x: number, y: number) :void {
        const anim = new PIXI.AnimatedSprite(this.texture);
        this.stage.addChild(anim);
        anim.x = x;
        anim.y = y;
        anim.loop = false;
        anim.anchor.set(0, 0);
        anim.pivot.set(0, 0);
        anim.width = Settings.explosion.width;
        anim.height = Settings.explosion.height;
        anim.animationSpeed = Settings.explosion.speed;
        anim.gotoAndPlay(0);

        anim.onComplete = () => {
            this.stage.removeChild(anim);
        };
    }
/*
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
*/
}