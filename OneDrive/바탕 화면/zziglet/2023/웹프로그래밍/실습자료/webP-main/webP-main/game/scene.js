"use strict";
// 씬 작성 영역

/** function gamePauseScene() : 일시정지 화면 */
function gamePauseScene() {
    context.font = "20pt Arial";
    context.textAlign = "center";
    context.fillText("일시정지됨", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(interval);
    return true;
}

/** function ballOutScene() : 공 떨어졌을 때 처리 */
function ballOutScene() {
    cancelAnimationFrame(interval);
    if (--currentStage.lifeLeft <= 0) currentStage.isOver = true;
    updateLife();
    ball.init();
}

/** function gameOverScene() : 게임 오버 처리 */
function gameOverScene() {
    clearInterval(timer);
    cancelAnimationFrame(interval);
    return true;
}

// div 관리영역
function updateLife() {
    $("#life").text("♥".repeat(Math.max(currentStage.lifeLeft, 0)));
}

function updateTime() {
    $("#time").text(currentStage.timeLeft);
}

function updateScore() {
    $("#score").text(currentStage.score);
}

function changeTime() {
    currentStage.timeLeft--;
    if (currentStage.timeLeft >= 0) updateTime();
    else currentStage.isOver = true;
}
