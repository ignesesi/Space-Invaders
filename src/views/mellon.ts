
import { ObjectView } from "./object_view";

export class Mellon extends ObjectView {
    deltaR: number;
    constructor(tex: string, w: number, h: number, dY: number, dR: number){
        super(tex, w, h, 0, dY);
        this.deltaR = dR;
    }
}