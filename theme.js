var loadedBackground = black;

function loadBackground(backgroundName) {
	if(loadedBackground === backgroundName) {
		disable("blackground");
		return;
	}
	
    document.getElementById('background').src = 'backgrounds/' + backgroundName + '.html';
	document.getElementById('templateStyle').href = 'backgrounds/' + backgroundName + '.css';
	loadedBackground = backgroundName;
		
	disable("blackground");
}

function clearBackground() {
	enable("blackground");
	loadBackground("black");
}