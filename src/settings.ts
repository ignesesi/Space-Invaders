
class View {
    width: number;
    height: number;
    constructor(w: number, h: number){
        this.width = w;
        this.height = h;
    }
}

class ObjectView extends View{
    deltaX: number;
    deltaY: number;
    constructor(w: number, h: number, dX: number = 0, dY: number = 0){
        super(w,h);
        this.width = w;
        this.height = h;
        this.deltaX = dX;
        this.deltaY = dY;
    }
}

class BunnyCont {
    rows: number;
    cols: number;
    deltaX: number;
    constructor(r: number, c: number, dx: number){
        this.rows = r;
        this.cols = c;
        this.deltaX = dx;
    }
}

class Bunny extends ObjectView {
    spacing: number;
    tints: number[];
    constructor(w: number, h: number, sp: number, t: number[]){
        super(w - sp, h - sp);
        this.spacing = sp;
        this.tints = t;
    }
}

class Mellon extends ObjectView {
    deltaR: number;
    constructor(w: number, h: number, dY: number, dR: number){
        super(w, h, 0, dY);
        this.deltaR = dR;
    }
}

export class Settings {
    static readonly game: View = new View(800, 800);
    static readonly bunny_cont: BunnyCont = new BunnyCont(5, 10, 2);
    
    static readonly init: View = 
    new ObjectView(Settings.game.width / (Settings.bunny_cont.cols + 2), Settings.game.width / (Settings.bunny_cont.cols + 2));

    static readonly panda: ObjectView = new ObjectView(Settings.init.width, Settings.init.height, 3);
    
    static readonly mellon: Mellon = new Mellon(Settings.panda.width / 3, Settings.panda.height / 3, -5, 0.2);

    static readonly bunny: Bunny = new Bunny(Settings.init.width, Settings.init.height,
        Settings.init.width * 1/5, [0xff0000, 0xeb8634, 0xffff00, 0x34eb3a, 0x00ffe5]);

    static readonly carrot: ObjectView = new ObjectView(Settings.bunny.width / 2, Settings.bunny.height * 2/3, 0, 5);

    static readonly offset: View = new View((Settings.game.width - Settings.init.width * Settings.bunny_cont.cols) / 2, Settings.bunny.height);

}
