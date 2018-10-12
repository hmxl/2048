
// 单元格位置
function getTop(i,j){
	var top = (i+1)*spaceWidth + i*cellWidth;
	return top;
}
function getLeft(i,j){
	var left = (j+1)*spaceWidth + j*cellWidth;
	return left;
}


// 上层单元格颜色
function getBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

// 单元格中字的颜色
function getTextColor(num){
	if(num <= 4){
		return "grey";
	}else{
		return "#fff";
	}
}

// 循环空余单元格
function getEmptyCell(num){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(num[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

// 分数更新
function updataScore(num){
	$(".score_num").text(num);
}

// 判断能否向左移动
function canMoveLeft(arr){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(arr[i][j] != 0){
				if(arr[i][j-1]==0 || arr[i][j-1]==arr[i][j]){
					return true;	
				}
			}
		}
	}
	return false;
}

// 判断能否向上移动
function canMoveTop(arr){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j] != 0){
				if(arr[i-1][j]==0 || arr[i-1][j]==arr[i][j]){
					return true;	
				}
			}
		}
	}
	return false;
}

// 判断能否向右移动
function canMoveRight(arr){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(arr[i][j] != 0){
				if(arr[i][j+1]==0 || arr[i][j+1]==arr[i][j]){
					return true;	
				}
			}
		}
	}
	return false;
}

// 判断能否向下移动
function canMoveBottom(arr){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j] != 0){
				if(arr[i+1][j]==0 || arr[i+1][j]==arr[i][j]){
					return true;	
				}
			}
		}
	}
	return false;
}
// 判断横向中间是否有间隔
function noBlockHorizontal(row, col1, col2,arr){
	for(var i=col1+1;i<col2;i++){
		if(arr[row][i] != 0){
			return false;
		}
	}
	return true;
}
// 判断纵向中间是否有间隔
function noBlockVertical(row1, row2, col,arr){
	for(var i=row1+1;i<row2;i++){
		if(arr[i][col] != 0){
			return false;
		}
	}
	return true;
}


