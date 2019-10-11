
import { ObjectView } from "./object_view";

export class Bunny extends ObjectView {
    spacing: number;
    tints: number[];
    constructor(tex: string, w: number, h: number, sp: number, t: number[]){
        super(tex, w - sp, h - sp);
        this.spacing = sp;
        this.tints = t;
    }
}