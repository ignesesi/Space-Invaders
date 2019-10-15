
import { ObjectView } from "./object_view";

export class Carrot extends ObjectView {
    max_number: number;
    constructor(tex: string, w: number, h: number, dX: number, dY: number, mn: number){
        super(tex, w, h, dX, dY);
        this.max_number = mn;
    }
}