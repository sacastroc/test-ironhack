var a;
var customRange;
$(document).ready(function() {
	$.each(markerGroups,function(index, group) {
		console.log(index);
		customRange = 'inr-' + index;
		a = document.getElementById(customRange);
		a.max = 200;
	});

});
var outImage;

function getValues(v,index) {
	outImage = 'out-' + index;
	if (v < a.max / 3) {
		// $(outImage).attr('src','images/del.png');
		// document.getElementById(outImage).innerHTML = "<img src='images/war.png' height=30 width=30 class='mark'>";
		document.getElementById(outImage).src = 'images/del.png';
	}else if (v < (a.max / 3) * 2) {
		$(outImage).attr('src','images/war.png');
		document.getElementById(outImage).src = 'images/war.png';
	}else {
		$(outImage).attr('src','images/sec.png');
		document.getElementById(outImage).src = 'images/sec.png';
	}
}
