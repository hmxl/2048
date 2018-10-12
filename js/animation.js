function createCell(i,j,number){
	// console.log(j,j,number)
	$("#move-"+i+"-"+j).css({
		"background-color": getBackgroundColor(number),
		"color": getTextColor(number),
	}).text(number).animate({
		"top":getTop(i,j),
		"left":getLeft(i,j),
		"width":cellWidth,
		"height":cellWidth
	}, 200);

}

// 移动动画效果
function moveAnimation(fromx,fromy,tox,toy){
	$("#move-"+fromx+"-"+fromy).animate({
		top:getTop(tox,toy),
		left:getLeft(tox,toy)
	}, 200);
}
