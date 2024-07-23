"use strict";
// 전역변수 작성 영역
// 황서진]게임 화면 크기는 width: 1280px; height: 920px; 를 기준으로 하겠습니다.
const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

class StageStatus {
    constructor(stageData, timeLeft, lifeLeft, score) {
        this.stageData = stageData;
        this.isPaused = false;
        this.isOver = false;
        this.isCleared = false;
        this.timeLeft = timeLeft;
        this.lifeLeft = lifeLeft;
        this.score = score;
        this.combo = 0;
    }
}

let interval = null;
let timer = null;

const itemList = ["fire", "water", "stone", "air"];

let currentStage = null;
