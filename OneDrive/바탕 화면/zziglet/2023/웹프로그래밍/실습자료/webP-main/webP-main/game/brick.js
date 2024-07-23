"use strict";

/*
Author: 황서진
Date: 2023.05.19
- stageBrick 클래스
	[소개]: "현재" 스테이지의 전체 벽돌들을 구성합니다.
	[멤버 변수]: currentBrickComposition 배열(충돌 결과를 포함, 진행중인 게임 상에서의 배열을 저장합니다.)
	[멤버 함수]
		생성자 함수/ (ctx, (int)stage 정보)
		init함수/ 초기에 한 번 실행됩니다. 
		drawStageBrick함수/ 전체 블럭 구성을 draw합니다. 
						단일 벽돌 클래스인 Brick의 draw함수를 호출하며, main의 draw함수에서 반복되며 호출됩니다.
						멤버 변수인 currentBrickComposition배열을 기준으로 벽돌을 생성합니다.
	[more]
		init 함수/ stage값을 기준으로 constant.js의 stageBrickComposition[][] (스테이지 블럭 구성 정보)를 가져옵니다.
					** 
						constant.js에서는 
						stageBrickInformation = [stageOne, stageTwo];
						stageone = [[1,1,1,1,0,0,0], [1,2,0,0,0,2,1]];
						과 같은 형식으로 저장할 것입니다. (stageBrickInformation는 포인터 저장)
					**
					currentBrickComposition = stageBrickInformation[stage];
*/

class stageBrick {
    constructor(ctx, stage) {
        this.ctx = ctx;
        this.currentStage = stage;
        this.currentBrickComposition = stageOne; //스테이지 블럭 구성 정보를 저장할 배열입니다.
    }

    init() {
        var info = stageBrickInformation[this.currentStage]; //constant.js의 값을 어떻게 들고올지에 대해 공부가 필요합니다.
        /*
			가져온 스테이지 정보에 맞게, 멤버 변수를 구성합니다. 1이면 일반 벽돌, 2이면 아이템 벽돌, 0이면 공백입니다. 
		*/
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    this.currentBrickComposition[i][j] = new Brick(
                        this.ctx,
                        i,
                        j
                    );
                } else if (info[i][j] == 2) {
                    this.currentBrickComposition[i][j] = new itemBrick(
                        this.ctx,
                        i,
                        j
                    );
                } else {
                    this.currentBrickComposition[i][j] = null;
                }
            }
        }
    }

    drawStageBrick() {
        // 그릴 벽돌이 없으면 게임 클리어로 처리합니다.
        let isGameClear = true;
        //멤버 변수인 currentBrickComposition 배열에 맞게 블럭을 그립니다.
        for (let i = 0; i < this.currentBrickComposition.length; i++) {
            for (let j = 0; j < this.currentBrickComposition[i].length; j++) {
                // null인 경우, 이미 충돌된 경우 continue;
                if (
                    this.currentBrickComposition[i][j] != null &&
                    this.currentBrickComposition[i][j].life == true
                ) {
                    this.currentBrickComposition[i][j].draw(); // itemBrick클래스는 Brick을 상속합니다.
                    isGameClear = false; // 벽돌을 하나라도 그렸으면 게임 진행 중입니다.
                }
            }
        }
        if (isGameClear) currentStage.isCleared = true;
    }
}

/*
Author: 황서진
Date: 2023.05.19
- 단일 벽돌 클래스입니다.
	[소개]: 단일 벽돌 
	[멤버 변수]: ctx, location x좌표, location y좌표, life (충돌 or not),(이하는 constant.js에서) brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft
	[멤버 함수]
		생성자 함수/ (ctx, x 좌표, y 좌표)
		init함수/ 초기에 한 번 실행됩니다. 
		drawBrick() 함수/ stageBrick클래스에서 호출됩니다. 
		setLife() 함수/ main.js에서 collision발생 시 호출됩니다. false로 바꿉니다. 
		getLife() 함수/ 멤버 변수 life의 getter 함수입니다. 
*/

class Brick {
    constructor(ctx, Lx, Ly) {
        //Lx, Ly는 배열의 인덱스 번호 array[i][j]
        //이하 내용은 constant.js에 들어가는 것도 적합해 보임

        this.brickHeight = 50;
        this.brickPadding = 20;
        this.brickOffsetTop = 30;
        this.brickOffsetOneSide = 45;
        this.image = new Image();
        this.image.src = "../webP-main/images/brick_origin.png";
        this.brickWidth =
            (canvas.width - this.brickOffsetOneSide * 2) / 7 -
            this.brickPadding;
        //멤버 변수
        this.ctx = ctx;
        this.life = true;
        this.brickX =
            Lx * (this.brickWidth + this.brickPadding) +
            this.brickOffsetOneSide;
        this.brickY =
            Ly * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
    }
    draw() {
        context.drawImage(
            this.image,
            this.brickX,
            this.brickY,
            this.brickWidth,
            this.brickHeight
        );
    }
    //setter 함수
    setLife() {
        if (this.life) {
            this.life = false;
            currentStage.score +=
                100 * (1 + currentStage.combo * currentStage.combo++ * 0.1);
            updateScore();
        }
    }

    //getter 함수
    getLife() {
        return this.life;
    }
}

/*
Author: 황서진
Date: 2023.05.19
- js의 상속 활용에 대한 부분의 이해가 미흡한 상태로 작성한 코드입니다. 주의 부탁드립니다. 
- 아이템 벽돌 클래스입니다.
	[소개]: 아이템 벽돌 > Brick을 상속받습니다.  
	[멤버 변수]: "skinType 변수" (아이템 스킬 지정),ctx, location x좌표, location y좌표, life (충돌 or not),(이하는 constant.js에서) brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft
	[멤버 함수]
		init함수/ 초기에 한 번 실행됩니다. 아이템 블럭의 type을 결정합니다. 
		생성자 함수/ (ctx, x 좌표, y 좌표)
		+ itemList는 constant.js에서 가져올 예정입니다. 임시로 멤버 변수에 저장했습니다. 
		+ 아이템 종류는 랜덤으로 결정할 예정입니다. 

		**이하는 Brick과 같습니다. 
		drawBrick() 함수/ stageBrick클래스에서 호출됩니다. 
		setLife() 함수/ main.js에서 collision발생 시 호출됩니다. 반대로 바꿉니다. 
		getLife() 함수/ 멤버 변수 life의 getter 함수입니다. 
*/
class itemBrick extends Brick {
    constructor(ctx, Lx, Ly) {
        //Lx, Ly는 배열의 인덱스 번호 array[i][j]
        super(ctx);

        //이하 내용은 constant.js에 들어가는 것도 적합해 보임
        // this.brickWidth = 75;
        // this.brickHeight = 20;
        // this.brickPadding = 10;
        // this.brickOffsetTop = 30;
        // this.brickOffsetLeft = 30;

        // ** 변화한 부분
        this.skinType;

        //멤버 변수
        this.ctx = ctx;
        this.life;
        this.brickX;
        this.brickY;
    }

    //상속
    draw() {
        super.draw();
    }
    init() {
        super.init();
        this.skinType = this.itemList[0]; // random으로 변경 예정
    }
    setLife() {
        super.setLife();
    }

    //getter 함수
    getLife() {
        super.getLife();
    }
}
