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
       this.load.image("fondo", "./src/assets/aaaa.jpg");
   
       this.load.image("logo", "./src/assets/logo.png");

       this.load.image("play", "./src/assets/play.png");

    }

   create(){
        this.add.image(1000,600, "fondo").setDepth(1);
        this.add.image(this.game.renderer.width / 2,this.game.renderer.height / 4, "logo").setDepth(1);

        //this.startbutton = this.add.image(this.game.renderer.width / 2,this.game.renderer.height / 2, "play").setDepth(1);
        this.startbutton.create();
    

        this.credits = this.add.text(50, 500,'Podeu trobar el codi font aquí:').setDepth(1);
        this.githubVal = this.add.image(95,460,'github').setInteractive();
        this.githubVal.setScale(0.39);
        this.githubVal.on('pointerdown', () => {
            var s = window.open('https://github.com/Fmunozzafra/JocFMZ.git', '_blank');
            s.focus();
        });

   }
}

export default GameOver;