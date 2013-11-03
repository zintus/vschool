#pragma strict

var Bootstrap : GameObject;

function OnTriggerEnter() {
	var scr1 : StatisticParser = Bootstrap.GetComponent.<StatisticParser>();
	var scr2 : RPGParser = Bootstrap.GetComponent.<RPGParser>();
	var scr3 : Languages = Bootstrap.GetComponent.<Languages>();
	if (!scr1.STAT.visited) {
		if (!scr3.eng) scr2.Achievement("Первое посещение курса!\n+10 очков!", 10);
		else scr2.Achievement("First visit of this course!\n10 points!", 10);
		scr1.STAT.visited = true;
		scr1.Save();
	}
}