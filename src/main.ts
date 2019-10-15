import * as PIXI from "pixi.js";
//import gsap from "gsap";
import { Settings } from "./settings";
import { Bunny_Cont } from "./objects/bunny_cont";
import { Bunny } from "./objects/bunny";
import { Carrot } from "./objects/carrot";
import { Mellon } from "./objects/mellon";
import { Panda } from "./objects/panda";
import { Button } from "./objects/button";
import { Text } from "./objects/text";
import { Explosion } from "./objects/explosion";


export class Main {
    private game: PIXI.Application;
    private panda: Panda;
    private carrot: Carrot;
    private bunnies: Bunny[];
    private bunnies_num: number;
    private mellon: Mellon;
    private bunny_cont: Bunny_Cont;
    private button: Button;
    private main_cont: PIXI.Container;
    private isStopped: boolean;
    private lives: Text;
    private score: Text;
    private explosion: Explosion;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("images", "assets/images/images.json");
        loader.add("explosion", "assets/images/mc.json");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.isStopped = true;
        this.createRenderer();
        this.createObjects();
        this.createEvents();
        this.createTicker();
        this.pause_restart("PLAY", false);
    }   

    private pause_restart(text: string, restart: boolean = false){
        
        this.button.add(this.game.stage, text);
        this.game.stage.removeChild(this.main_cont);
        this.removeEvents();
        this.isStopped = true;

        this.button.play.on("pointertap", () =>{
            this.game.stage.removeChild(this.button);
            this.game.stage.addChild(this.main_cont);
            this.createEvents();
            if(restart) {
                this.reset();
            }
            this.isStopped = false;
        });
    
    }

    private reset() :void {
        this.panda.reset();
        this.carrot.reset();
        this.mellon.remove(this.main_cont);
        this.bunny_cont.reset();
        this.lives.reset(Settings.lives);
        this.score.reset(Settings.score);
        this.bunnies_num = Settings.bunny_cont.rows * Settings.bunny_cont.cols;
        for(let i = 0; i < Settings.bunny_cont.rows; i++) {
            for(let j = 0; j < Settings.bunny_cont.cols; j++) {
                const ind = i*Settings.bunny_cont.cols+j;
                this.bunnies[ind].reset(i,j);
                this.bunny_cont.addChild(this.bunnies[ind]);
            }
        }
    }

    //private key_down (args: any) {
    key_down = (args: any) => {
        const panda = this.panda;
        const mellon = this.mellon;
        const stage = this.main_cont;
        //console.log(args.key);
        if(args.key == "ArrowLeft") {
            panda.deltaX = -Settings.panda.deltaX;
        }
        if(args.key == "ArrowRight") {
            panda.deltaX = Settings.panda.deltaX;
        }
        if(args.key == " " && !mellon.visible){
            mellon.add(stage, panda.x + panda.width/2, panda.y);
        }
    }
    
    // private key_up (args: any) {
    key_up = (args: any) => {
        if(args.key == "ArrowLeft" || args.key == "ArrowRight") {
            this.panda.deltaX = 0;
        }
        
        if(args.key == "R" || args.key == "r") {
            this.pause_restart("PLAY", true);
        }

        if(args.key == "p" || args.key == "P") {
            this.pause_restart("PAUSE",false);
        }
    }

    private createEvents() :void {
        //const pause_restart = this.pause_restart;
        window.addEventListener("keydown", this.key_down);
        window.addEventListener("keyup", this.key_up);
    }

    private removeEvents() :void {
        //const pause_restart = this.pause_restart;
        window.removeEventListener("keydown", this.key_down);
        window.removeEventListener("keyup", this.key_up);
    }

    private createObjects(): void {

        this.lives = new Text(Settings.lives);
        this.score = new Text(Settings.score);

        this.bunnies_num = Settings.bunny_cont.rows * Settings.bunny_cont.cols;
        this.main_cont = new PIXI.Container();
        const stage = this.main_cont;

        this.bunny_cont = new Bunny_Cont(stage);
        
        stage.addChild(this.lives, this.score);

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

        this.explosion = new Explosion(stage);

        this.game.stage.addChild(stage);

        this.button = new Button();
    }
        
    private createTicker(): void{

        this.game.ticker.add(() => {
            if(!this.isStopped) {
                const panda = this.panda;
                const mellon = this.mellon;
                const bunnies = this.bunnies;
                const bunny_cont = this.bunny_cont;
                const carrot = this.carrot;
                const lives = this.lives;
                const score = this.score;
                const explosion = this.explosion;

                const stage = this.game.stage;
        
                panda.x += panda.deltaX;
                carrot.y +=  carrot.deltaY;
                if(carrot.areColliding(panda)){
                    lives.value --;
                    explosion.add(panda.x, panda.y);
                    if(lives.value == 0) {
                        this.pause_restart("GAME OVER\n PLAY AGAIN", true);
                    }
                    carrot.reset();
                }
                if(carrot.y > Settings.game.height){
                    carrot.reset();
                    //console.log(carrot.x, carrot.y)
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
                            explosion.add(bunnies[i].getGlobalPosition().x, bunnies[i].getGlobalPosition().y);
                            score.value += bunnies[i].price;
                            //stage.removeChild(bunnies[i]);
                            bunnies[i].remove(bunny_cont);
                            mellon.remove(stage);
        
                            this.bunnies_num --;
                            console.log("BUNNIES: ", this.bunnies_num);
                            if(this.bunnies_num == 0) {
                                this.pause_restart("YOU WON\n PLAY AGAIN", true);
                            }
                            //stage.removeChild(mellon);
                        }
                    }
                    if(mellon.areColliding(carrot)){
                        explosion.add(carrot.x, carrot.y);
                        mellon.remove(stage);
                        carrot.reset();
                    }
                }

                this.lives.update();
                this.score.update();
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
    }
}

const game: Main = new Main();
