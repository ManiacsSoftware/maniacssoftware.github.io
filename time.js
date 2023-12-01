
function setTimerVisibility(visible) {
	if(visible) {
		removeClassByQuerySelector('#countdown', 'hiddenMy');
	} else {
		addClassByQuerySelector('#countdown', 'hiddenMy');
	}
}

function setTime(time) {
	const elements = document.querySelectorAll('.clock');

	elements.forEach((element) => {
	  element.innerHTML = time;
	});
}

function setRemaining(hours, minutes, seconds) {
	//document.getElementById('hours').innerHTML = hours; 
	document.getElementById('minutes').innerHTML = minutes;
	document.getElementById('seconds').innerHTML = seconds;
}

var targetTime = 0;


function startCountdown(inSeconds) {
	let now = new Date();
	const milliseconds = inSeconds * 1000; // 1000 milliseconds = 1 second
	targetTime = new Date(now.getTime() + milliseconds);
	
	countdownTick();
	setTimerVisibility(true);
}

function finishTimer() {
	setTimerVisibility(false);
}

function countdownTick() {
	const today = new Date();
	var dif = new Date(targetTime - today );
	
	let h = dif.getHours();
	let m = dif.getMinutes();
	let s = dif.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	
	setRemaining(h, m, s);
	
	if( today.valueOf() > targetTime.valueOf() ) {
		finishTimer();
		return;
	}
	
	setTimeout(countdownTick, 1000); 
}


function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  setTime(h + ":" + m + ":" + s);
  setTimeout(startTime, 1000);
}  

function checkTime(i) {
  if (i > -10 && i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

$(document).ready(function() { 
  startTime();
});