var a;

$(document).ready(function() {
	a = document.getElementById('inr-price');
	a.max = 200;
	getValues(a.value)
	//$('#out-price').text(a.value)
});

function getValues(v) {
	if (v < a.max / 3) {
		document.getElementById('out-price').innerHTML = "<img src='images/del.png' height=30 width=30 class='mark'>";
	}else if (v < (a.max / 3) * 2) {
		document.getElementById('out-price').innerHTML = "<img src='images/war.png' height=30 width=30 class='mark'>";
	}else {
		document.getElementById('out-price').innerHTML = "<img src='images/sec.png' height=30 width=30 class='mark'>";
	}
}
