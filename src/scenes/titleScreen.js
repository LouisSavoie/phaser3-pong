import Phaser from 'phaser';
import WebFontFile from './webFontFile';

export default class TitleScreen extends Phaser.Scene {
    preload() {

        // GOOGLE FONT
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);

    };
    create() {

        // TITLE
        this.title = this.add.text(400, 225, 'PHASER 3 PONG', {
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        }).setOrigin();

        // START MESSAGE
        this.add.text(400, 400, 'Press SPACE to Start', {
            fontSize: 16,
            fontFamily: '"Press Start 2P"'
        }).setOrigin();

        // START BUTTON
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game');
        });

    };
};