import Phaser from 'phaser';
import WebFontFile from './webFontFile';

export default class WinScreen extends Phaser.Scene {
    preload() {

        // GOOGLE FONT
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);

    };
    create() {

        // WIN TEXT
        this.title = this.add.text(400, 225, 'YOU WIN!', {
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        }).setOrigin();

        // PLAY AGAIN MESSAGE
        this.add.text(400, 400, 'Press SPACE to Play again', {
            fontSize: 16,
            fontFamily: '"Press Start 2P"'
        }).setOrigin();

        // START BUTTON
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game');
        });

    };
};