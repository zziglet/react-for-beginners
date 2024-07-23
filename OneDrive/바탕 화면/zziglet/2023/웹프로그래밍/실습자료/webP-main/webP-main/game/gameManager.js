// for startPage
function inPageAddListner(){
	//1. start page
	$("#ruleButton")[0].addEventListener('click', showIntroduceCanvas);
	$("#startButton")[0].addEventListener('click', startToOpening);
	$("#setButton")[0].addEventListener('click', settingToGame);
	//$("#overButton")[0].addEventListener('click', startToOpening);
	//2. opening page
	$("#skipButton")[0].addEventListener('click', openingToContent);

	//3. content page
	// gameover 시 > #gameOver
	// gameclear 시 > #gameClear
}

function showIntroduceCanvas(){
	var canvas = document.getElementById('introducePage');
	// 화면 중앙에 배치
	$("#startPage").css({"position" : "relative"});
	$("#introducePage").css({"display" : "inline", "position" : "absolute", "width" : "400px" , "height" : "800px","top" : "15%", "left" : "35%"});
    
    if (canvas.getContext) {
    	//이미지로 변경할 예정.
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (0, 0, 500, 500);
    }
}

function startToOpening(){
	//case1. by using fadeInNOut
	$("#startPage").fadeOut(1000);
	$("#opening").delay(2000).fadeIn(1000);
}

function settingToGame(){
	var canvas = document.getElementById('setPage');
	$("#setPage").css({"display" : "block"});
}

function openingToContent(){
	//case2. by using display
	$("#opening").fadeOut(1000);
	$("#stage").delay(2000).fadeIn(1000);
	$("#level1")[0].addEventListener('click', function(){	
		currentStage.lifeLeft = 3;
		ball.speed = 4;
		currentStage.stageData = stageOne;
		$("#stage").css({"display" : "none"});
		$("#content").css({"display" : "block"});
	});
	$("#level2")[0].addEventListener('click', function(){	
		currentStage.lifeLeft = 2;
		ball.speed = 5;
		currentStage.stageData = stageTwo;
		$("#stage").css({"display" : "none"});
		$("#content").css({"display" : "block"});
	});
	$("#level3")[0].addEventListener('click', function(){	
		currentStage.lifeLeft = 1;
		ball.speed = 6;
		currentStage.stageData = stageTwo;
		$("#stage").css({"display" : "none"});
		$("#content").css({"display" : "block"});
	});
}

inPageAddListner();