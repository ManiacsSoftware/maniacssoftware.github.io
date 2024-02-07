var loadedBackground = "black";
var versesOnBlack = false;

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
		
	if(versesOnBlack !== onBlack) {
		versesOnBlack = onBlack;
		if(onBlack) {
			disableBackground();
		} else {
			enableBackground();
		}
	}
	
	if(loadedBackground !== backgroundName) {
		loadBackground = backgroundName;
		document.getElementById('background').src = 'backgrounds/' + backgroundName + '.html';
		document.getElementById('templateStyle').href = 'backgrounds/' + backgroundName + '.css';
	}
}

function clearBackground() {
	enable("blackground");
	setTimeout(loadBackground, 1000, "black");
}

