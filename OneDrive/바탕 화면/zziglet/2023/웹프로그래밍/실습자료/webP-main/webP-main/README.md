# webP_ 웹프로그래밍 8팀 팀프로젝트
   
## 1. 주의사항
- 들여쓰기는 4칸 기준입니다.   
  변수명, 함수명은 자바스크립트 기본이 camelCase를 사용해서, 일단 camelCase로 진행합니다.   
  다른 의견 있으시면 카톡으로 해주세요!   
- window.onload()는 쓰지 않고, 대신 initialize()로 사용합니다.   
	defer 기능, 즉 `<script defer … >`를 사용하여 굳이 window.onload를 쓸 필요는 없습니다.   
	defer에 관해서는 https://youtu.be/tJieVCgGzhs  영상의 8분 34초부터 참고해주세요!   
  게임 시작할 때 초기화하는 부분은 initialize() 함수 내부에 작성해주시기 바랍니다.
- 캔버스 크기는 추후 변경될 수도 있습니다.   
  게임 캔버스 화면의 너비와 높이는 각각 canvas.width와 canvas.height로 작성해주세요.   
