import Phaser from 'phaser';
import * as Colors from '../consts/colors';

export default class GameBackground extends Phaser.Scene {
    preload() {

    };
    create() {
        // CENTER LINE
        this.add.line(
            400, 225,
            0, 0,
            0, 450,
            Colors.White, 1
        ).setLineWidth(3, 3);
    };
};