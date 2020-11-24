import Phaser from 'phaser';
import TitleScreen from './scenes/titleScreen';
import Game from './scenes/game';
import GameBackground from './scenes/gameBackground';
import WinScreen from './scenes/winScreen';
import LoseScreen from './scenes/loseScreen';

const config = {
    width: 800,
    height: 450,
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            //debug: true
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add('titleScreen', TitleScreen);
game.scene.add('game', Game);
game.scene.add('gameBackground', GameBackground);
game.scene.add('winScreen', WinScreen);
game.scene.add('loseScreen', LoseScreen);

game.scene.start('titleScreen');