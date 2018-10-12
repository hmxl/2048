// 移动端适配
var documentWidth =  document.documentElement.clientWidth;
// console.log(documentWidth);
var containerWidth = documentWidth*0.92;
var cellWidth = documentWidth*0.18;
var spaceWidth = documentWidth*0.04;




var num = new Array();
var score = 0;

// 单元格叠加状态
var state = new Array();

$(function(){
	newGame();
});

function newGame(){
	if(documentWidth>800){
		containerWidth = 500;
		cellWidth = 100;
		spaceWidth = 20;
	}
	//设置移动端尺寸
	settingForMobile();

	// console.log(11);
	init();

	// 产生随机数
	getCell();
	getCell();
}

// 移动端初始时样式
function settingForMobile(){
	$('.title').css({
		'font-size': cellWidth*0.5,
		'margin':cellWidth*0.5 +'auto'
	});

	$('.author').css({
		'font-size': cellWidth*0.2,
	});

	$('.box').css({
		'width':containerWidth,
		'margin':cellWidth*0.2 +'auto'
	});

	$('.score').css({
		'width':cellWidth*1.8,
		'height':cellWidth*0.4,
		'border-radius':cellWidth*0.1
	});

	$('.new').css({
		'width':cellWidth*1.2,
		'height':cellWidth*0.4,
		'border-radius':cellWidth*0.1
	});

	$('.score_num').css({
		'font-size':cellWidth*0.28,
		'line-height':cellWidth*0.4 +'px',
	});

	$('.new_text').css({
		'font-size':cellWidth*0.2,
		'line-height':cellWidth*0.4 +'px',
	});

	$('.score_text').css({
		'font-size':cellWidth*0.2,
		'line-height':cellWidth*0.4 +'px',
	});

	$('#back').css({
		'width':containerWidth,
		'height':containerWidth,
		'border-radius':cellWidth*0.1,
		'padding':spaceWidth,
	});

	$('.fix').css({
		'width':cellWidth,
		'height':cellWidth,
		'border-radius':cellWidth*0.2,
	});


}

// 页面初始化
function init(){
	// 固定底层单元格
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#fix-"+i+"-"+j).css({
				"top":getTop(i,j),
				"left":getLeft(i,j)
			});
			// $("#fix-"+i+"-"+j).css("top",getTop(i,j));
			// $("#fix-"+i+"-"+j).css("left",getLeft(i,j));
		}
	}

	// 数组初始化
	for(var i=0;i<4;i++){
		num[i] = new Array();
		state[i] = new Array();
		for(var j=0;j<4;j++){
			num[i][j] = 0;
			// 单元格未叠加为false
			state[i][j] = false;
		}
	}

	// num[0][0] = 2;
	// num[1][3] = 4;
	// num[3][3] = 16;

	// 初始化分数
	score=0;
	updataScore(score);

	// 顶层移动单元格
	updataCell();
}

// 更新顶层移动单元格
function updataCell(){
	// 每次移动清空
	$(".move").remove();


	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#back").append('<div class="move" id="move-'+i+'-'+j+'"></div>');
			if(num[i][j] == 0 ){
				$("#move-"+i+"-"+j).css({
					"width": 0,
					"height": 0,
					"top":(getTop(i,j)+cellWidth*0.5),
					"left":(getLeft(i,j)+cellWidth*0.5)
				});
			}else{
				$("#move-"+i+"-"+j).css({
					"width": cellWidth,
					"height": cellWidth,
					"top":getTop(i,j),
					"left":getLeft(i,j),
					"background-color": getBackgroundColor(num[i][j]),
					"color": getTextColor(num[i][j]),
				});
				$("#move-"+i+"-"+j).text(num[i][j]);
			}

			// 刷新单元格叠加状态
			state[i][j] = false;
		}
	}

	$('.move').css({
		'border-radius':cellWidth*0.2,
		'font-size':cellWidth*0.5,
		'line-height':cellWidth + 'px',
	});
}

// 随机空余位置出现单元格
function getCell(){
	// var a,b;
	// do{
	// 	a = Math.floor((Math.random()*4));
	// 	b = Math.floor((Math.random()*4));
	// 	if(num[a][b] == 0){
	// 		break;
	// 	};
	// }while(num[a][b] != 0);

	// // console.log(a,b);
	// num[a][b] = getRandom();
	// $("#move-"+a+"-"+b).css({
	// 	"width": "100px",
	// 	"height": "100px",
	// 	"background-color": getBackgroundColor(num[a][b]),
	// 	"color": getTextColor(num[a][b]),
	// });
	// $("#move-"+a+"-"+b).text(num[a][b]);
	
	// 循环空单元格
	if(getEmptyCell(num)){
		// console.log("jieshu");
		return;
	}

	// 空单元格位置
	var count = 0;
	var pos = new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(num[i][j] == 0){
				pos[count] = i*4+j;
				count++;
			}
		}
	}

	// 产生随机位置
	var rand = Math.floor((Math.random()*count));
	var X = Math.floor((pos[rand]/4));
	var Y = pos[rand]%4;

	// 产生随机数
	var number = Math.random()>0.5?2:4;

	// 动画生成
	num[X][Y] = number;
	createCell(X,Y,number);
	
}

$(document).keydown(function(event){
	event.preventDefault();
	// console.log(event);
	switch (event.keyCode) {
		case 37: //左
			// 向左移动
			if(canMoveLeft(num)){
				moveLeft();
				setTimeout(getCell, 200);
			}else if(!canMoveTop(num) && !canMoveRight(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
			break;
		case 38: //上
			// 向上移动
			// console.log('1');
			if(canMoveTop(num)){
				moveTop();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveRight(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
			break;
		case 39: //右
			// 向右移动
			if(canMoveRight(num)){
				moveRight();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveTop(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
			break;
		case 40: //下
			// 向下移动
			if(canMoveBottom(num)){
				moveBottom();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveTop(num) && !canMoveRight(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart', function(e){
// 	e.preventDefault();
	document.documentElement.style.touchAction = 'none';
	startx=e.touches[0].pageX;
	starty=e.touches[0].pageY;
});

document.addEventListener('touchmove', function(e){
// 	e.preventDefault();
// 	e.stopPropagation();
	document.documentElement.style.touchAction = 'auto';
});

document.addEventListener('touchend', function(e){
	e.preventDefault();
	endx=e.changedTouches[0].pageX;
	endy=e.changedTouches[0].pageY;

	//判断滑动方向
	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<documentWidth*0.08 && Math.abs(deltay)<documentWidth*0.08){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){ //水平方向移动
		if(deltax>0){ //向右移动
			if(canMoveRight(num)){
				moveRight();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveTop(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
		}else{ //向左移动
			if(canMoveLeft(num)){
				moveLeft();
				setTimeout(getCell, 200);
			}else if(!canMoveTop(num) && !canMoveRight(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
		}
	}else{ //垂直方向移动
		if(deltay>0){ //向下移动
			if(canMoveBottom(num)){
				moveBottom();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveTop(num) && !canMoveRight(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
		}else{ //向上移动
			if(canMoveTop(num)){
				moveTop();
				setTimeout(getCell, 200);
			}else if(!canMoveLeft(num) && !canMoveRight(num) && !canMoveBottom(num)){
				setTimeout(function(){
					alert("game over");
				},250);
			}
		}
	}
});



// 单元格向左移动
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(num[i][j] != 0){
				for(var k=0;k<j;k++){
					if(num[i][k] == 0 && noBlockHorizontal(i,k,j,num)){
						num[i][k] = num[i][j];
						num[i][j] = 0;
						// console.log(i,k);
						moveAnimation(i,j,i,k);
						break;
					}else if(num[i][k] != 0 && noBlockHorizontal(i,k,j,num) && !state[i][k]){
						if(num[i][k] == num[i][j]){
							num[i][k] = num[i][k]+num[i][j];
							num[i][j] = 0;
							// 修改叠加状态
							state[i][k] = true;
							moveAnimation(i,j,i,k);
							// getCell();
							score += num[i][k];
							updataScore(score);

							break;
						}
					}
				}
			}
		}
	}
	setTimeout(updataCell,200);
}

// 单元格向上移动
function moveTop(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(num[i][j] != 0){
				for(var k=0;k<i;k++){
					if(num[k][j] == 0 && noBlockVertical(k,i,j,num)){
						num[k][j] = num[i][j];
						num[i][j] = 0;
						// console.log(i,k);
						moveAnimation(i,j,k,j);
						break;
					}else if(num[k][j] != 0 && noBlockVertical(k,i,j,num) && !state[k][j]){
						if(num[k][j] == num[i][j]){
							num[k][j] = num[k][j]+num[i][j];
							num[i][j] = 0;
							// 修改叠加状态
							state[k][j] = true;
							moveAnimation(i,j,k,j);
							// getCell();
							score += num[k][j];
							updataScore(score);

							break;
						}
					}
				}
			}
		}
	}
	setTimeout(updataCell,200);
}

// 单元格向右移动
function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(num[i][j] != 0){
				for(var k=3;k>j;k--){
					if(num[i][k] == 0 && noBlockHorizontal(i,j,k,num)){
						num[i][k] = num[i][j];
						num[i][j] = 0;
						// console.log(i,k);
						moveAnimation(i,j,i,k);
						break;
					}else if(num[i][k] != 0 && noBlockHorizontal(i,j,k,num) && !state[i][k]){
						if(num[i][k] == num[i][j]){
							num[i][k] = num[i][k]+num[i][j];
							num[i][j] = 0;
							// 修改叠加状态
							state[i][k] = true;
							moveAnimation(i,j,i,k);
							// getCell();
							score += num[i][k];
							updataScore(score);
							break;
						}
					}
				}
			}
		}
	}
	setTimeout(updataCell,200);
}

// 单元格向下移动
function moveBottom(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(num[i][j] != 0){
				for(var k=3;k>i;k--){
					if(num[k][j] == 0 && noBlockVertical(i,k,j,num)){
						num[k][j] = num[i][j];
						num[i][j] = 0;
						// console.log(i,k);
						moveAnimation(i,j,k,j);
						break;
					}else if(num[k][j] != 0 && noBlockVertical(i,k,j,num) && !state[k][j]){
						if(num[k][j] == num[i][j]){
							num[k][j] = num[k][j]+num[i][j];
							num[i][j] = 0;
							// 修改叠加状态
							state[k][j] = true;
							moveAnimation(i,j,k,j);
							// getCell();
							score += num[k][j];
							updataScore(score);

							break;
						}
					}
				}
			}
		}
	}
	setTimeout(updataCell,200);
}
