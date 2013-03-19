#pragma strict

var Bootstrap : GameObject;

function OnTriggerEnter() {
	var scr1 : RPGParser = Bootstrap.GetComponent.<RPGParser>();
	var scr2 : Languages = Bootstrap.GetComponent.<Languages>();
	if (!scr1.RPG.firstVisitLecture) {
		if (!scr2.eng) scr1.Achievement("Первое посещение лекционного зала!\n+10 очков!", 10);
		else scr1.Achievement("First visit of this lecture hall!\n10 points!", 10);
		scr1.RPG.firstVisitLecture = true;
	}
}