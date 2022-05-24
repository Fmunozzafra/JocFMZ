import Phaser from 'phaser'
import { Startbutton } from '../components/Startbutton';

export class GameOver extends Phaser.Scene
{  
   constructor() {
       super('GameOver');
       this.startbutton = new Startbutton(this);
   }

   init(){

   }

   preload(){
       this.load.image("fondo", "assets/aaaa.jpg");
   
       this.load.image("gameO", "assets/gameOver.png");

       this.load.image("play", "assets/play.png");

    }

   create(){
        this.add.image(1000,600, "fondo");
        this.gameOver = this.add.image(this.game.renderer.width / 2,this.game.renderer.height / 4, "gameO");
        this.gameOver.setScale(0.45);

        this.startbutton.create();
    

        this.credits = this.add.text(50, 500,'Podeu trobar el codi font aquí:');
        this.githubVal = this.add.image(175,560,'github').setInteractive();
        this.githubVal.setScale(0.15);
        this.githubVal.on('pointerdown', () => {
            var s = window.open('https://github.com/Fmunozzafra/JocFMZ.git', '_blank');
            s.focus();
        });

   }
}

export default GameOver;