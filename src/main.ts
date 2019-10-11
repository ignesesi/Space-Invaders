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
    private panda: Panda;
    private carrot: Carrot;
    private bunnies: Bunny[];
    private bunnies_num: number;
    private mellon: Mellon;
    private bunny_cont: Bunny_Cont;

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

        //this.game.stop();

        this.createObjects();

        this.button("PLAY");

    }   

    private button(str: string){

        //this.game.stop();
        ///da se natisne

        this.reset();
        this.play();
    }

    private play() :void {
        //this.game.start();

        const panda = this.panda;
        const mellon = this.mellon;
        const bunnies = this.bunnies;
        const bunny_cont = this.bunny_cont;
        const carrot = this.carrot;
        const stage = this.game.stage;
        let bunnies_num = this.bunnies_num;
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
                mellon.add(stage, panda.x + panda.width/2, panda.y);
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
                carrot.reset();
            }
            if(carrot.y > Settings.game.height){
                carrot.reset();
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
                }
                for(let i = 0; i < bunnies.length; i++) {
                    if(mellon.areColliding(bunnies[i])) {
                        //console.log("aaa");
                        panda.score += bunnies[i].price;
                        //stage.removeChild(bunnies[i]);
                        bunnies[i].remove(stage);
                        mellon.remove(stage);

                        bunnies_num --;
                        if(bunnies_num == 0) {
                            this.button("YOU WON :) PLAY AGAIN");
                        }
                        //stage.removeChild(mellon);
                    }
                }
            }

        });
    }

    private reset() :void {
        this.panda.reset();
        this.carrot.reset();
        this.mellon.remove(this.game.stage);
        this.bunny_cont.reset();
        this.bunnies_num = Settings.bunny_cont.rows * Settings.bunny_cont.cols;
        for(let i = 0; i < Settings.bunny_cont.rows; i++) {
            for(let j = 0; j < Settings.bunny_cont.cols; j++) {
                this.bunnies[i*Settings.bunny_cont.cols+j].reset(i,j);
            }
        }
    }

    private createObjects(): void {
        const stage = this.game.stage;
        this.bunny_cont = new Bunny_Cont(stage);
        this.bunnies = [];
        for(let i = 0; i < Settings.bunny_cont.rows; i++) {
            for(let j = 0; j < Settings.bunny_cont.cols; j++) {
                let bunny = new Bunny(this.bunny_cont,i, j);
                this.bunnies.push(bunny);
            }
        }
        this.panda = new Panda(stage);
        this.mellon = new Mellon(stage);
        this.carrot = new Carrot(stage);
    }

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0x000000,
            width: Settings.game.width,
            height: Settings.game.height
        });
        document.body.appendChild(this.game.view);

    }
}

const game: Main = new Main();
