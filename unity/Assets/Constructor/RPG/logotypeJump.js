#pragma strict

var Bootstrap : GameObject;

function OnTriggerEnter() {
	var scr1 : RPGParser = Bootstrap.GetComponent.<RPGParser>();
	var scr2 : Languages = Bootstrap.GetComponent.<Languages>();
	if (!scr1.RPG.logotypeJump) {
		if (!scr2.eng) scr1.Achievement("Прыжок в логотип!\n+10 очков!", 10);
		else scr1.Achievement("Jump into a logotype!\n10 points!", 10);
		scr1.RPG.logotypeJump = true;
	}
}