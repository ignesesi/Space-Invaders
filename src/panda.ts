import * as PIXI from "pixi.js";
import { Settings } from "./settings";
import { GameObject } from "./game_object";

export class Panda extends GameObject {
    public lives: number;
    public score: number;

    constructor(stage: PIXI.Container) {
        super(stage, Settings.panda);
        this.reset();
    }

    public reset() :void {
        const x = (Settings.game.width - Settings.panda.width)/2;
        const y = Settings.game.height - 2 * Settings.panda.height;
        this.deltaX = 0;
        this.interactive = true;
        this.lives = 3;
        this.score = 0;
        super.reset(x, y);
    }
}