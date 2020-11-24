import Phaser from 'phaser';

export default class GameBackground extends Phaser.Scene {
    preload() {

    };
    create() {
        this.add.line(
            400, 225,
            0, 0,
            0, 450,
            0xffffff, 1
        ).setLineWidth(3, 3);
    };
};