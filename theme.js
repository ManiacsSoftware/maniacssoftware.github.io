var loadedBackground = "black";
var versesOnBlack = null;

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
			if(boolOnBlack) {
				disableBackground();
			} else {
				enableBackground();
			}
		}
	}
	
	if(loadedBackground !== backgroundName) {
		loadedBackground = backgroundName;
		document.getElementById('background').src = base + 'backgrounds/' + backgroundName + '.html';
		document.getElementById('templateStyle').href =  base + 'backgrounds/' + backgroundName + '.css';
	}
}

function clearBackground() {
	enable("blackground");
	setTimeout(loadBackground, 1000, "black");
}

