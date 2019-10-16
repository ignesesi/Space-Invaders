
import gsap from "gsap";
import * as PIXI from "pixi.js";
import { Settings } from "../settings";

export class Anim321 {
    private body: gsap.TimelineMax;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container, fun: any) {
        this.stage = stage;
        this.body = new gsap.TimelineMax({onComplete: fun});

        for(let i = 0; i <4; i++) {
            //console.log("WTF");
            const anim: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.from(Settings.anim321.texture[i]));
            anim.position.set(Settings.anim321.x, Settings.anim321.y);
            anim.width = Settings.anim321.width;
            anim.height = Settings.anim321.height;

            this.body.add(gsap.TweenMax.to(anim, Settings.anim321.duration, {alpha: 0, 
                onStart: () => { this.stage.addChild(anim); }, onComplete: () => { this.stage.removeChild(anim); } }));
        }
        this.body.pause();
    }
    
    public play() : void {
        this.body.restart();
    }
}
