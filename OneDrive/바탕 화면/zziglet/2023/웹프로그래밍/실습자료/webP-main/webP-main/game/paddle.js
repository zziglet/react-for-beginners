"use strict";
class Paddle {
    constructor(width, height) {
        this.height = height;
        this.width = width;
    }

    init() {
        this.width = 162;
        this.height = 57;
        this.paddleX = (canvas.width - this.width) / 2;
        this.img = new Image();
        this.paddleimgarr = [
            "../webP-main/images/kirby_origin.png",
            "../webP-main/images/fire_origin.png",
            "../webP-main/images/ice_origin.png",
            "../webP-main/images/stone_origin.png",
        ];
        this.imgarridx = 0;
        this.img.src = this.paddleimgarr[this.imgarridx];
    }

    drawPaddle() {
        context.drawImage(this.img, this.paddleX, canvas.height - this.height);
    }

    getWidth() {
        return this.width;
    }

    getPaddleX() {
        return this.paddleX;
    }

    setPaddleX(x) {
        this.paddleX = x;
    }
}

/** mouseMoveHandler(e) : 마우스 이동 Event Handler */
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    relativeX = Math.min(
        Math.max(paddle.width / 2, relativeX),
        canvas.width - paddle.width / 2
    );
    paddle.setPaddleX(relativeX - paddle.width / 2);
}
