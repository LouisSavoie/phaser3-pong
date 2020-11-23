import Phaser from 'phaser';

export default class TitleScreen extends Phaser.Scene {
    preload() {

    };
    create() {
        this.add.text(400, 225, 'Hello, World!').setOrigin();
    };
};