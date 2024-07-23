"use strict";

class Ball {
    constructor(imagesrc) {
        // x,y는 캔버스의 좌표
        this.x = (canvas.width - this.width) / 2;
        this.y = (canvas.height - this.height) / 2;

        //width랑 height는 공의 크기
        this.width = 40;
        this.height = 40;

        //공의 속도는 speed, angle로 각도 조절
        this.speed = 5;
        this.angle = Math.PI * 0.5;
        this.xdir = this.speed * Math.cos(this.angle);
        this.ydir = this.speed * Math.sin(this.angle);

        //공 이미지
        this.ballImage = new Image();
        this.ballImage.src = imagesrc;
    }

    init() {
        this.angle = Math.PI * 0.5;
        this.x = (canvas.width - this.width) / 2;
        this.y = (canvas.height - this.height) / 2;
        this.speed = 5;
    }

    run() {
        this.x += this.xdir;
        if (this.x < 0) {
            this.x = 0;
            this.angle = Math.PI - this.angle; // this.xdir = -this.xdir;
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            this.angle = Math.PI - this.angle; // this.xdir = -this.xdir;
        }
        this.y += this.ydir;
        if (this.y < 0) {
            this.y = 0;
            this.angle = Math.PI * 2 - this.angle; // this.ydir = -this.ydir;
        }
        if (this.y > canvas.height - this.height) {
            this.speed = 0;
            ballOutScene();
        }
        this.xdir = this.speed * Math.cos(this.angle);
        this.ydir = this.speed * Math.sin(this.angle);
        this.draw();
    }

    draw() {
        context.drawImage(
            this.ballImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
