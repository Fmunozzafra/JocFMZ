import Menu from './scenes/Menu';
import Game1 from './scenes/Game1';
import Game2 from './scenes/Game2';
import GameOver from "./scenes/GameOver";
import Phaser from 'phaser';


const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1200,
    scene: [Menu,Game1,Game2,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

};

const game = new Phaser.Game(config);
