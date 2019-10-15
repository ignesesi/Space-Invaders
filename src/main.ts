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
    private main_cont: PIXI.Container;
    private button: Button;

    private isStopped: boolean;

    private panda: Panda;
    private mellon: Mellon;
    private bunnies: Bunny[];
    private bunnies_num: number;
    private bunny_cont: Bunny_Cont;
    private carrot: Carrot;

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
        
        this.button.add(text);
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
        this.mellon.remove();
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

    key_down = (args: any) => {
        const panda = this.panda;
        const mellon = this.mellon;
        //console.log(args.key);
        if(args.key == "ArrowLeft") {
            panda.deltaX = -Settings.panda.deltaX;
        }
        if(args.key == "ArrowRight") {
            panda.deltaX = Settings.panda.deltaX;
        }
        if(args.key == " " && !mellon.visible){
            mellon.add(panda.x + panda.width/2, panda.y);
        }
    }
    
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

        this.bunnies_num = Settings.bunny_cont.rows * Settings.bunny_cont.cols;
        this.main_cont = new PIXI.Container();
        const stage = this.main_cont;

        this.lives = new Text(stage, Settings.lives);
        this.score = new Text(stage, Settings.score);

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
        this.explosion = new Explosion(stage);

        this.game.stage.addChild(stage);
        this.button = new Button(this.game.stage);
    }

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0x000000,
            width: Settings.game.width,
            height: Settings.game.height
        });

        document.body.appendChild(this.game.view);
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
        
                panda.move();
                carrot.move();

                if(carrot.areColliding(panda)){
                    lives.value --;
                    explosion.add(panda.x, panda.y);
                    if(lives.value == 0) {
                        this.pause_restart("GAME OVER\n PLAY AGAIN", true);
                    }
                    carrot.reset();
                }

                bunny_cont.move();
                
                if(mellon.visible) {
                    mellon.move();
                    for(let i = 0; i < bunnies.length; i++) {
                        if(mellon.areColliding(bunnies[i])) {
                            explosion.add(bunnies[i].getGlobalPosition().x, bunnies[i].getGlobalPosition().y);
                            score.value += bunnies[i].price;
                            bunnies[i].remove();
                            mellon.remove();
        
                            this.bunnies_num --;
                            if(this.bunnies_num == 0) {
                                this.pause_restart("YOU WON\n PLAY AGAIN", true);
                            }
                        }
                    }

                    if(mellon.areColliding(carrot)){
                        explosion.add(carrot.x, carrot.y);
                        mellon.remove();
                        carrot.reset();
                    }
                }

                //lives, score
                this.lives.update();
                this.score.update();
            }
        });
    }
}

const game: Main = new Main();
