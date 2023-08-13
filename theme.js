var loadedBackground = black;

function loadBackground(backgroundName) {
	if(loadedBackground === backgroundName) {
		return;
	}
	
    document.getElementById('background').data = 'backgrounds/' + backgroundName + '.html';
	loadedBackground = backgroundName;
}

function clearBackground() {
	loadBackground('black');
}