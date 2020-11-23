import Phaser from 'phaser';

import TitleScreen from './scenes/titleScreen';
import Game from './scenes/game';

const config = {
    width: 800,
    height: 450,
    type: Phaser.AUTO,
    backgroundColor: '#616161',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add('titleScreen', TitleScreen);
game.scene.add('game', Game);

game.scene.start('game');