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
import { Anim321 } from "./objects/anim321";

export class Main {
    private game: PIXI.Application;
    private main_cont: PIXI.Container;
    private button: Button;

    private isStopped: boolean;

    private panda: Panda;
    private mellon: Mellon[];
    private carrot: Carrot[];

    private bunnies: Bunny[];
    private bunnies_num: number;
    private bunny_cont: Bunny_Cont;
    
    private lives: Text;
    private score: Text;
    private explosion: Explosion;

    private anim321: Anim321;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("images", "assets/images/images.json");
        loader.add("explosion", "assets/images/mc.json");
        loader.add("numbers", "assets/images/0123456789.json");
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
        this.pause_restart("PLAY", true);
    }   

    private pause_restart(text: string, restart: boolean = false): void {
        this.button.add(text);
        this.game.stage.removeChild(this.main_cont);
        this.removeEvents(restart);
        this.isStopped = true;
        if(restart) {
            this.reset();
        }
        this.button.play.on("pointertap", this.start);
    }

    private reset(): void {
        this.panda.reset();

        for(let i = 0; i < this.carrot.length; i ++) {
            this.carrot[i].reset();
        }
        //this.carrot.splice(0,this.carrot.length);
        
        ///#############################
        for(let i = 0; i < this.mellon.length; i ++) {
            this.mellon[i].remove();
        }
        this.mellon.splice(0,this.mellon.length);
        ///#############################

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

    private start = () => {
        this.game.stage.removeChild(this.button);
        this.game.stage.addChild(this.main_cont);
        this.removePauseEvents();

        this.anim321.play();
        //this.isStopped = false;
    }

    private startAfter321 = () => {
        this.isStopped = false; 
        this.createEvents();
    }

    private key_down = (args: any) => {
        const panda = this.panda;
        const mellon = this.mellon;
        //console.log(args.key);
        if(args.key == "ArrowLeft") {
            panda.deltaX = -Settings.panda.deltaX;
        }
        if(args.key == "ArrowRight") {
            panda.deltaX = Settings.panda.deltaX;
        }
        if(args.key == " " && mellon.length < Settings.mellon.max_number){

            ///#############################
            mellon.push(new Mellon(this.main_cont, panda.x + panda.width/2, panda.y));
            ///#############################
        }
    }
    
    private key_up = (args: any) => {
        //console.log(args.key);
        if(args.key == "ArrowLeft" || args.key == "ArrowRight") {
            this.panda.deltaX = 0;
        }
        
        if(args.key == "R" || args.key == "r") {
            this.pause_restart("PLAY", true);
        }

        if(args.key == "p" || args.key == "P") {
            this.pause_restart("PAUSE", false);
        }
    }

    private key_up_start = (args: any) => {
        if(/*args.key == " " || */args.key == "Enter"){
            this.start();
        }
    }

    private key_up_pause = (args: any) => {
        if(args.key == "p" || args.key == "P") {
            this.start();
        }
    }

    private createEvents(): void {
        window.addEventListener("keydown", this.key_down);
        window.addEventListener("keyup", this.key_up);
    }

    private removePauseEvents() :void {
        window.removeEventListener("keyup", this.key_up_start);
        window.removeEventListener("keyup", this.key_up_pause);
    }

    private removeEvents(restart: boolean): void {
        window.removeEventListener("keydown", this.key_down);
        window.removeEventListener("keyup", this.key_up);

        window.addEventListener("keyup", this.key_up_start);
        if(!restart) {
            window.addEventListener("keyup", this.key_up_pause);
        }
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
        
        ///#############################
        this.mellon = [];

        this.carrot = [];
        for(let i = 0; i < Settings.carrot.max_number; i++) {
            this.carrot.push(new Carrot(stage));
        }

        this.explosion = new Explosion(stage);
        ///#############################

        this.game.stage.addChild(stage);
        this.button = new Button(this.game.stage);

        
        this.anim321 = new Anim321(this.game.stage, this.startAfter321);
    }

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0x000000,
            width: Settings.game.width,
            height: Settings.game.height
        });

        document.body.appendChild(this.game.view);
    }
 
    private createTicker(): void {

        this.game.ticker.add(() => {
            if(!this.isStopped) {
                const panda = this.panda;
                const mellon = this.mellon;
                const bunnies = this.bunnies;
                const bunny_cont = this.bunny_cont;
                const carrot = this.carrot;
                const lives = this.lives;
                const score = this.score;
                let explosion = this.explosion;
        
                panda.move();

                for(let i = 0; i < carrot.length; i ++) {
                    carrot[i].move(panda.x);

                    if(carrot[i].areColliding(panda)){
                        lives.value --;
                        //explosion.add(panda.x, panda.y);
                        explosion.add(panda.x, panda.y);
                        if(lives.value == 0) {
                            this.pause_restart("GAME OVER\n PLAY AGAIN", true);
                        }
                        carrot[i].reset(panda.x);
                        //carrot.splice(i, 1);
                        //i--;
                    }
                }

                bunny_cont.move();
                
                for(let j = 0; j < mellon.length; j ++){
                    mellon[j].move();

                    if(j >= 0 && mellon[j].y < 0) {
                        mellon[j].remove();
                        mellon.splice(j, 1);
                        j--;
                    }

                    for(let i = 0; i < bunnies.length && j < mellon.length && j >= 0; i++) {
                        if(j >= 0 && mellon[j].areColliding(bunnies[i])) {
                            //explosion.add(bunnies[i].getGlobalPosition().x, bunnies[i].getGlobalPosition().y);
                            explosion.add(bunnies[i].getGlobalPosition().x, bunnies[i].getGlobalPosition().y);

                            score.value += bunnies[i].price;
                            bunnies[i].remove();
        
                            mellon[j].remove();
                            mellon.splice(j, 1);
                            j--;
                            this.bunnies_num --;

                            if(this.bunnies_num == 0) {
                                this.pause_restart("YOU WON\n PLAY AGAIN", true);
                            }
                        }
                    }
                    for(let i = 0; i < carrot.length  && j < mellon.length && j >= 0; i ++) {
                        if(j >= 0 && j < mellon.length && mellon[j].areColliding(carrot[i])){
                            //explosion.add(carrot.x, carrot.y);
                            explosion.add(carrot[i].x, carrot[i].y);

                            carrot[i].reset(panda.x);
                            //carrot.splice(i, 1);
                            //i--;
                            
                            mellon[j].remove();
                            mellon.splice(j, 1);
                            j--;
                        }
                    }
                }

                this.lives.update();
                this.score.update();
            }
        });
    }
}

const game: Main = new Main();
