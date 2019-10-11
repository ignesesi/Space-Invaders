
import { View } from "./view";

export class ObjectView extends View{
    deltaX: number;
    deltaY: number;
    texture: string;
    constructor(tex: string, w: number, h: number, dX: number = 0, dY: number = 0){
        super(w,h);
        this.texture = tex;
        this.width = w;
        this.height = h;
        this.deltaX = dX;
        this.deltaY = dY;
    }
}