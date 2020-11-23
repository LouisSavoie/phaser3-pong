import Phaser from 'phaser';

export default class Game extends Phaser.Scene {

    init() {

        this.leftScore = 0;
        this.rightScore = 0;

    };
    preload() {

    };
    create() {

        // SET THE WORLD BOUNDS
        this.physics.world.setBounds(-100, 0, 1000, 450);

        // BALL
        this.ball = this.add.circle(400, 225, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true, 1, 1);

        this.resetBall();

        // PADDLE LEFT
        this.paddleLeft = this.add.rectangle(50, 225, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);
        this.physics.add.collider(this.paddleLeft, this.ball);

        // PADDLE RIGHT
        this.paddleRight = this.add.rectangle(750, 225, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);
        this.physics.add.collider(this.paddleRight, this.ball);

        // CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();

        // SCORES
        const scoreStyle = {fontSize: 48};
        // left score
        this.leftScoreLabel = this.add.text(350, 32, '0', scoreStyle).setOrigin(0.5, 0.5);
        // right score
        this.rightScoreLabel = this.add.text(450, 32, '0', scoreStyle).setOrigin(0.5, 0.5);
    };
    update() {

        // PADDLE LEFT CONTROL
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

        // PADDLE RIGHT CONTROL
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

        // SCORING
        if (this.ball.x < -30) {
            // scored on the left side, reset ball
            this.incrementRightScore();
            this.resetBall();
        } else if (this.ball.x > 830) {
            // scored on the right side, reset ball
            this.incrementLeftScore();
            this.resetBall();
        }
    };

    incrementLeftScore() {
        this.leftScore += 1;
        this.leftScoreLabel.text = this.leftScore.toString();
    };

    incrementRightScore() {
        this.rightScore += 1;
        this.rightScoreLabel.text = this.rightScore.toString();
    };

    // RESET BALL
    resetBall() {
        this.ball.setPosition(400, 225);
        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 200);
        this.ball.body.setVelocity(vec.x, vec.y);
    };

};