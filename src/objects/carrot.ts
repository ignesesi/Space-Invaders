import * as PIXI from "pixi.js";
import { Settings } from "../settings";
import { GameObject } from "./game_object";

export class Carrot extends GameObject {

    constructor(stage: PIXI.Container) {
        super(stage, Settings.carrot);
        this.reset();
    }

    public reset(pandax: number = -10) :void {
        super.reset(this.newX(pandax),this.newY());
    }

    public move(pandax: number = -10) :void {
        this.y +=  this.deltaY;
        if(this.y > Settings.game.height){
            this.reset(pandax);
        }
    }

    private newX(pandax: number = -10) :number {
        if(pandax == -10 || Math.random() < Settings.carrot.random) {
            const j = Math.floor(Math.random() * Settings.bunny_cont.cols);
            const x = j * Settings.init.width + (Settings.bunny.spacing / 2); 
            return x;
        }
        return pandax;
    }
    private newY() :number {
        const i = Math.floor(Math.random() * Settings.bunny_cont.rows); 
        const y = i * Settings.init.height + (Settings.bunny.spacing / 2);  
        return Settings.offset.height + y;
    }
}
