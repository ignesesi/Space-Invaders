     
import { ObjectView } from "./object_view";

export class Panda extends ObjectView {
    x: number;
    y: number;
    lives: number;
    constructor(tex: string, w: number, h: number, dX: number, x: number, y: number, l: number){
        super(tex, w, h, dX);
        this.x = x;
        this.y = y;
        this.lives = l;
    }
}