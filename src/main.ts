import * as PIXI from "pixi.js";
//import gsap from "gsap";
import { Settings } from "./settings";
import { Bunny_Cont } from "./bunny_cont";
import { Bunny } from "./bunny";
import { Carrot } from "./carrot";
//import { GameObject } from "./game_object";
import { Mellon } from "./mellon";
import { Panda } from "./panda";

export class Main {
    private game: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }
    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("images", "assets/images/images.json");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        this.button("PLAY");

    }   

    button(str: string){
        this.play();
    }

    play(){
        const stage = this.game.stage;
            
        //console.warn(Settings.init.width, Settings.init.height);
        let bunnies: Bunny[] = [];
        let bunny_cont = new Bunny_Cont(stage);
        for(let i = 0; i < Settings.bunny_cont.rows; i++) {
            for(let j = 0; j < Settings.bunny_cont.cols; j++) {
                let bunny = new Bunny(bunny_cont,i, j);
                //console.log(bunny.x, bunny.y);
                //bunny_cont.addChild(bunny);
                bunnies.push(bunny);
            }
        }
        //stage.addChild(bunny_cont);

        let panda = new Panda(stage);
        //let panda = new GameObject(stage, Settings.panda, "panda", (Settings.game.width - Settings.panda.width)/2, Settings.game.height - 2 * Settings.panda.height);

        //stage.addChild(panda);

        let mellon = new Mellon(stage);

        let carrot = new Carrot(stage);
    /*
        window.addEventListener("keydown", key_down(args));
        window.addEventListener("keyup", key_up(args));
        this.game.ticker.add(game_loop());
    */

        window.addEventListener("keydown", (args) => {
            console.log("bla");
            if(args.key == "ArrowLeft") {
                panda.deltaX = -Settings.panda.deltaX;
            }
            if(args.key == "ArrowRight") {
                panda.deltaX = Settings.panda.deltaX;
            }
            if(args.key == " " && !mellon.visible){
                //console.log("Space");
                mellon.x = panda.x + panda.width/2;
                mellon.y = panda.y;
                //console.log(mellon.x,mellon.y);
                mellon.visible = true;
                stage.addChild(mellon);
            }
        });

        window.addEventListener("keyup", (args) => {
            if(args.key == "ArrowLeft" || args.key == "ArrowRight") {
                panda.deltaX = 0;
            }
        });

        this.game.ticker.add(() => {
            panda.x += panda.deltaX;
            carrot.y +=  carrot.deltaY;
            if(carrot.areColliding(panda)){
                panda.lives --;
                if(panda.lives == 0) {
                    this.button("GAME OVER :( PLAY AGAIN");
                }
                carrot.x = carrot.newX();
                carrot.y = carrot.newY();
            }
            if(carrot.y > Settings.game.height){
                carrot.x = carrot.newX();
                carrot.y = carrot.newY();
                console.log(carrot.x, carrot.y)
            }
            //console.log(panda.x, panda.y, panda.deltaX, Settings.panda.deltaX);
            bunny_cont.x += bunny_cont.deltaX;
            if(bunny_cont.x <= 0 || bunny_cont.x >= Settings.offset.width*2) {
                bunny_cont.deltaX *= (-1);
                bunny_cont.x += bunny_cont.deltaX;
                mellon.y += mellon.deltaY;
            }

            if(mellon.visible) {
                //console.log(mellon.x,mellon.y);
                mellon.y += mellon.deltaY;
                mellon.rotation += mellon.deltaR;
                if(mellon.y + mellon.height <= 0) {
                    mellon.remove(stage);
                    stage.removeChild(mellon);
                }
                for(let i = 0; i < Settings.bunny_cont.rows*Settings.bunny_cont.cols; i++) {
                    if(mellon.areColliding(bunnies[i])) {
                        //console.log("aaa");
                        panda.score += bunnies[i].price;
                        //stage.removeChild(bunnies[i]);
                        bunnies[i].remove(stage);
                        mellon.remove(stage);

                        bunnies.length --;
                        if(bunnies.length == 0) {
                            this.button("YOU WON :) PLAY AGAIN");
                        }
                        //stage.removeChild(mellon);
                    }
                }
            }

        });

    }

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0x000000,
            width: Settings.game.width,
            height: Settings.game.height
        });

        document.body.appendChild(this.game.view);
/*
        this.game.renderer.resize(window.innerWidth, window.innerHeight);
        this.game.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.game.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", () => {
            this.game.renderer.resize(window.innerWidth, window.innerHeight);
            this.game.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
            this.game.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
        });
*/

    }
}

const game: Main = new Main();
