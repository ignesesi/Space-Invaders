
import { ObjectView } from "./object_view";

export class Bunny extends ObjectView {
    spacing: number;
    tints: number[];
    prices: number[];
    constructor(tex: string, w: number, h: number, sp: number, t: number[], p: number[]){
        super(tex, w - sp, h - sp);
        this.spacing = sp;
        this.tints = t;
        this.prices = p;
    }
}