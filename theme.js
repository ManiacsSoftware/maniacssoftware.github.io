function loadBackground(backgroundName) {
    document.getElementById('background').data = 'backgrounds/' + backgroundName + '.html';
}

function clearBackground() {
	loadBackground('black');
}