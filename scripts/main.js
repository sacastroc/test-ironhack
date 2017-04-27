var a;
var customRange;
$(document).ready(function() {
	$.each(markerGroups,function(index, group) {
		// console.log(index);
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

// Get the modal
var modal = document.getElementById('aboutModal');

// Get the button that opens the modal
var btn = document.getElementById("aboutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
