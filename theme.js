var loadedBackground = "black";
var versesOnBlack = null;
var onBlack;

var backgroundElement = document.getElementById('background');

backgroundElement.onload = function(event){
	console.log("Background on load call! [" + event.target + "]");
	if(versesOnBlack) {
		disableBackground();
	} else {
		enableBackground();
		document.querySelector("button[aria-label='Play']")
		console.log(document.querySelector("button[aria-label='Play']"));
		
		if(event.target.querySelector("button[aria-label='Play']")) {
			event.target.querySelector("button[aria-label='Play']").click();
		}
	}
};

function disableBackground() {
	backgroundDisabled = true;
	enable("blackground");
	addClassByQuerySelector('#verses', 'blackground');	
}

function enableBackground() {
	backgroundDisabled = false;
	disable("blackground");
	removeClassByQuerySelector('#verses', 'blackground');
}

function loadBackground(backgroundName, onBlack) {	
	debug("onBlack changed to " + onBlack);
	
	// onBlack can be null (no change)
	if(onBlack != null) {
		var boolOnBlack = onBlack === "true";
		if(versesOnBlack != boolOnBlack) {
			versesOnBlack = boolOnBlack;
		}
	}
	
	if(loadedBackground !== backgroundName) {
		loadedBackground = backgroundName;
		disableBackground();
		
		if(backgroundName.startsWith('http')) {
			document.getElementById('background').src = backgroundName;
			// document.getElementById('templateStyle').href =  base +	"backgrounds/blank.css"; // Should we clear the theme?
		} else {
			document.getElementById('background').src = base + 'backgrounds/' + backgroundName + '.html';
			document.getElementById('templateStyle').href =  base + 'backgrounds/' + backgroundName + '.css';
		}
	}
}

function clearBackground() {
	enable("blackground");
	setTimeout(loadBackground, 1000, "black");
}

