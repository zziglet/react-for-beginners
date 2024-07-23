"use strict";

/** function collisionDetection(paddle, ball) : paddle - ball 간 충돌 감지 */

let bounceAble = true;

function collisionDetectionPaddle(ball, paddle) {
    if (!bounceAble) {
        bounceAble = ball.y + ball.height < canvas.height - paddle.height - 10;
        return;
    }

    // y축 방향 튕김
    if (
        ball.x + ball.width + ball.xdir > paddle.paddleX &&
        ball.x + ball.xdir < paddle.paddleX + paddle.width &&
        ball.y + ball.height > canvas.height - paddle.height &&
        ball.y < canvas.height
    ) {
        //공, 패들 collision 알고리즘
        let ballPosX = ball.x + ball.width / 2;
        let paddlePosX = paddle.paddleX + paddle.width / 2;
        let diff = (ballPosX - paddlePosX) / paddle.width;
        ball.angle = (Math.PI * 3) / 2 + ((Math.PI * 3) / 8) * diff;

        //ball.angle = Math.PI * 2 - ball.angle;
        bounceAble = false;

        // 콤보 초기화
        currentStage.combo = 0;
    }
}

function collisionDetectionBrick(ball) {
    let bounceXCount = 0;
    let bounceYCount = 0;
    for (let i = 0; i < stage.currentBrickComposition.length; i++) {
        for (let j = 0; j < stage.currentBrickComposition[i].length; j++) {
            let brick = stage.currentBrickComposition[i][j];
            if (brick == null || !brick.getLife()) continue;

            // y축 방향 튕김
            if (
                ball.x + ball.width + ball.xdir > brick.brickX &&
                ball.x + ball.xdir < brick.brickX + brick.brickWidth &&
                ball.y + ball.height > brick.brickY &&
                ball.y < brick.brickY + brick.brickHeight
            ) {
                ball.angle = Math.PI - ball.angle;
                brick.setLife();
                bounceYCount++;
            }
            // x축 방향 튕김
            if (
                ball.x + ball.width > brick.brickX &&
                ball.x < brick.brickX + brick.brickWidth &&
                ball.y + ball.height + ball.ydir > brick.brickY &&
                ball.y + ball.ydir < brick.brickY + brick.brickHeight
            ) {
                ball.angle = Math.PI * 2 - ball.angle;
                brick.setLife();
                bounceXCount++;
            }
        }
    }
    // 짝수 개의 벽돌에 닿으면 한번 더 충돌
    if (bounceXCount > 0 && bounceXCount % 2 == 0)
        ball.angle = Math.PI * 2 - ball.angle;
    if (bounceYCount > 0 && bounceYCount % 2 == 0)
        ball.angle = Math.PI - ball.angle;
}
