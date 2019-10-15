     
import { ObjectView } from "./object_view";

export class Panda extends ObjectView {
    x: number;
    y: number;
    constructor(tex: string, w: number, h: number, dX: number, x: number, y: number){
        super(tex, w, h, dX);
        this.x = x;
        this.y = y;
    }
}