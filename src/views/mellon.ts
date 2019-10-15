
import { ObjectView } from "./object_view";

export class Mellon extends ObjectView {
    deltaR: number;
    max_number: number;
    constructor(tex: string, w: number, h: number, dY: number, dR: number, mn: number){
        super(tex, w, h, 0, dY);
        this.deltaR = dR;
        this.max_number = mn;
    }
}