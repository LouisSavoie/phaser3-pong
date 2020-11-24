import Phaser from 'phaser';
import WebFontFile from './webFontFile';
import * as Colors from '../consts/colors';

export default class Game extends Phaser.Scene {

    init() {

        // SCORES
        this.leftScore = 0;
        this.rightScore = 0;

    };
    preload() {

        // GOOGLE FONT
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);

        // SFX
        this.load.audio('pongBeep', [ 'assets/ping_pong_8bit_beeep.ogg', 'assets/ping_pong_8bit_beeep.wav', 'assets/ping_pong_8bit_beeep.mp3' ]);
        this.load.audio('pongPlop', [ 'assets/ping_pong_8bit_plop.ogg', 'assets/ping_pong_8bit_plop.wav', 'assets/ping_pong_8bit_plop.mp3' ]);

    };
    create() {

        // BACKGROUND
        this.scene.run('gameBackground');

        // WORLD BOUNDS
        this.physics.world.setBounds(-100, 0, 1000, 450);

        // BALL
        this.ball = this.add.circle(400, 225, 10, Colors.White, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(10);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', this.ballBoundsSound, this);

        // PADDLE LEFT
        this.paddleLeft = this.add.rectangle(50, 225, 30, 100, Colors.White, 1);
        this.physics.add.existing(this.paddleLeft, true);
        this.physics.add.collider(this.paddleLeft, this.ball, this.playBeep, undefined, this);

        // PADDLE RIGHT
        this.paddleRight = this.add.rectangle(750, 225, 30, 100, Colors.White, 1);
        this.physics.add.existing(this.paddleRight, true);
        this.physics.add.collider(this.paddleRight, this.ball, this.playBeep, undefined, this);

        // CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();

        // SCORES
        const scoreStyle = {
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        };
        
        // left score
        this.leftScoreLabel = this.add.text(325, 48, '0', scoreStyle).setOrigin(0.5, 0.5);

        // right score
        this.rightScoreLabel = this.add.text(475, 48, '0', scoreStyle).setOrigin(0.5, 0.5);

        this.time.delayedCall(1500, () => {
            this.resetBall();
        });
    };
    update() {

        if (this.paused) {
            return;
        }

        // PADDLE LEFT CONTROL
        this.updatePlayer();

        // PADDLE RIGHT CONTROL
        this.updateAI();

        // SCORING
        this.checkScore();

        // CHECK FOR WIN
        this.checkWin();
    };

    // PADDLE LEFT CONTROL
    updatePlayer() {
        const playerSpeed = 3;

        if (this.cursors.up.isDown) {
            // move up
            this.paddleLeft.y -= playerSpeed;
            this.paddleLeft.body.updateFromGameObject();
        } else if (this.cursors.down.isDown) {
            // move down
            this.paddleLeft.y += playerSpeed;
            this.paddleLeft.body.updateFromGameObject();
        }
    };

    // PADDLE RIGHT CONTROL
    updateAI() {
        const aiSpeed = 0.5;

        const diff = this.ball.y - this.paddleRight.y;

        if (diff < 0) {
            // ball is above paddle, move up
            this.paddleRight.y -= aiSpeed;
            this.paddleRight.body.updateFromGameObject();
        } else if (diff > 0) {
            // ball is below paddle, move down
            this.paddleRight.y += aiSpeed;
            this.paddleRight.body.updateFromGameObject();
        }
    };

    // PLAY BEEP SFX
    playBeep(paddle, ball) {
        this.sound.play('pongBeep');
    };

    // PLAY PLOP SFX
    playPlop(paddle, ball) {
        this.sound.play('pongPlop');
    };

    ballBoundsSound(body, up, down, left, right) {
        if (left || right) {
            return;
        } else {
            this.playPlop();
        }
    };

    // SCORING
    checkScore() {
        if (this.ball.x < -30) {
            // scored on the left side, reset ball
            this.playPlop();
            this.incrementRightScore();
            this.resetBall();
        } else if (this.ball.x > 830) {
            // scored on the right side, reset ball
            this.playPlop();
            this.incrementLeftScore();
            this.resetBall();
        }
    };

    // UPDATE SCORES
    incrementLeftScore() {
        this.leftScore += 1;
        this.leftScoreLabel.text = this.leftScore.toString();
    };

    incrementRightScore() {
        this.rightScore += 1;
        this.rightScoreLabel.text = this.rightScore.toString();
    };

    // CHECK FOR WIN
    checkWin() {
        const maxScore = 7;
        if (this.leftScore >= maxScore) {
            // player wins
            this.scene.stop('gameBackground');
            this.scene.start('winScreen');

        } else if (this.rightScore >= maxScore) {
            // ai wins
            this.scene.stop('gameBackground');
            this.scene.start('loseScreen');
        }
    };

    // RESET BALL
    resetBall() {
        this.ball.setPosition(400, 225);
        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 200);
        this.ball.body.setVelocity(vec.x, vec.y);
    };

};