var loadedBackground = black;

function loadBackground(backgroundName) {
	if(loadedBackground === backgroundName) {
		return;
	}
	
    document.getElementById('background').src = 'backgrounds/' + backgroundName + '.html';
	document.getElementById('templateStyle').href = 'backgrounds/' + backgroundName + '.css';
	loadedBackground = backgroundName;
}

function clearBackground() {
	loadBackground('black');
	document.getElementById('templateStyle').href = 'backgrounds/blank.css';
}