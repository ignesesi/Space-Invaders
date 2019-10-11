
export class BunnyCont {
    rows: number;
    cols: number;
    deltaX: number;
    constructor(r: number, c: number, dx: number){
        this.rows = r;
        this.cols = c;
        this.deltaX = dx;
    }
}