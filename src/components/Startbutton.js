import { Button } from './Button.js';


export class Startbutton extends Button {
    

    constructor(scene) {
        super(scene, "play", 600, 600);
    }

    doClick() {

        this.relatedScene.scene.start('Game1',{score:1});
    }

}