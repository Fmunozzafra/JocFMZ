import Phaser from 'phaser'
import { Startbutton } from '../components/Startbutton';


export class Menu extends Phaser.Scene
{  
   constructor() {
       super('Menu');
       this.startbutton = new Startbutton(this);
   }

   init(){

   }

   preload(){
       this.load.image("fondo", "assets/aaaa.jpg");
   
       this.load.image("github", "assets/github.jpg");

       this.load.image("logo", "assets/logo.png");

       this.load.image("play", 'assets/play.png');

    }

   create(data){
        this.add.image(1000,600, "fondo");
        this.add.image(this.game.renderer.width / 2,this.game.renderer.height / 4, "logo");

        this.startbutton.create();
        
    

        this.codi = this.add.text(50, 500,'Podeu trobar el codi font aquí:');
        this.github = this.add.image(175,560,'github').setInteractive();
        this.github.setScale(0.15);
        this.github.on('pointerdown', () => {
            var s = window.open('https://github.com/Fmunozzafra/JocFMZ.git', '_blank');
            s.focus();
        });

        
   }
}

export default Menu;