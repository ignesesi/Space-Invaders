import * as PIXI from "pixi.js";
import { View } from "./views/view";
import { ObjectView } from "./views/object_view";
import { BunnyCont } from "./views/bunny_cont";
import { Bunny } from "./views/bunny";
import { Mellon } from "./views/mellon";
import { Button } from "./views/button";
import { Panda } from "./views/panda";
import { Text } from "./views/text";
import { Explosion } from "./views/explosion";
export class Settings {
    static readonly game: View = new View(800, 800);
    static readonly bunny_cont: BunnyCont = new BunnyCont(5, 7, 2);
    
    static readonly init: View = 
    new View(Settings.game.width / (Settings.bunny_cont.cols + 2), Settings.game.width / (Settings.bunny_cont.cols + 2));

    static readonly text_style: PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: Settings.game.height / 20 < Settings.init.height ? Settings.game.height / 20 : Settings.init.height,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        //wordWrap: true,
        //wordWrapWidth: w*2
    });

    static readonly panda: Panda = new Panda("panda.png", Settings.init.width, Settings.init.height, 5, (Settings.game.width - Settings.init.width)/2, Settings.game.height - Settings.init.height);
    
    static readonly mellon: Mellon = new Mellon("mellon.png", Settings.panda.width / 3, Settings.panda.height / 3, -8, 0.8, 5);

    static readonly bunny: Bunny = new Bunny("bunny.png", Settings.init.width, Settings.init.height,
        Settings.init.width * 1/5, [0xff0000, 0xeb8634, 0xffff00, 0x34eb3a, 0x00ffe5],
        [10,8,5,3,1,0,0,0,0,0]);

    static readonly carrot: ObjectView = new ObjectView("carrot.png", Settings.bunny.width / 5, Settings.bunny.height * 2/3, 0, 5);

    static readonly offset: View = new View((Settings.game.width - Settings.init.width * Settings.bunny_cont.cols) / 2, Settings.bunny.height);
    //for the bunny cont

    static readonly button: Button = new Button(Settings.game.width / 5, Settings.game.height / 10, Settings.game.width / 2, Settings.game.height / 2,
        0x0, 0xff0000, Settings.text_style, Settings.game.height / 20 ); 

    static readonly score: Text = new Text("Score: ", 0, Settings.text_style, 0, 0);
    
    static readonly lives: Text = new Text("Lives: ", 3, Settings.text_style, Settings.game.width - Number(Settings.text_style.fontSize) * 4, 0);

    static readonly explosion: Explosion = new Explosion(Settings.init.width, Settings.init.height, 0.5, 25);
}
