import { View } from "./views/view";
import { ObjectView } from "./views/object_view";
import { BunnyCont } from "./views/bunny_cont";
import { Bunny } from "./views/bunny";
import { Mellon } from "./views/mellon";
export class Settings {
    static readonly game: View = new View(800, 800);
    static readonly bunny_cont: BunnyCont = new BunnyCont(5, 10, 2);
    
    static readonly init: View = 
    new View(Settings.game.width / (Settings.bunny_cont.cols + 2), Settings.game.width / (Settings.bunny_cont.cols + 2));

    static readonly panda: ObjectView = new ObjectView("panda.png", Settings.init.width, Settings.init.height, 3);
    
    static readonly mellon: Mellon = new Mellon("mellon.png", Settings.panda.width / 3, Settings.panda.height / 3, -5, 0.2);

    static readonly bunny: Bunny = new Bunny("bunny.png", Settings.init.width, Settings.init.height,
        Settings.init.width * 1/5, [0xff0000, 0xeb8634, 0xffff00, 0x34eb3a, 0x00ffe5]);

    static readonly carrot: ObjectView = new ObjectView("carrot.png", Settings.bunny.width / 5, Settings.bunny.height * 2/3, 0, 5);

    static readonly offset: View = new View((Settings.game.width - Settings.init.width * Settings.bunny_cont.cols) / 2, Settings.bunny.height);

}
