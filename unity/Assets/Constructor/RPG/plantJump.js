#pragma strict

var Bootstrap : GameObject;
var triggered = false;

function OnTriggerEnter() {
	var scr1 : RPGParser = Bootstrap.GetComponent.<RPGParser>();
	var scr2 : Languages = Bootstrap.GetComponent.<Languages>();
	if (!triggered) {
		triggered = true;
		if (!scr1.RPG.plantJump_First) {
			if (!scr2.eng) scr1.Achievement("Прыжок на цветы!\n+10 очков!", 10);
			else scr1.Achievement("Jump on a plant!\n10 points!", 10);
			scr1.RPG.plantJump_First = true;
		}
		else if (!scr1.RPG.plantJump_Second) {
			if (!scr2.eng) scr1.Achievement("Еще прыжок на цветы!\n+10 очков!", 10);
			else scr1.Achievement("Another jump on a plant!\n10 points!", 10);
			scr1.RPG.plantJump_Second = true;
		}		
	}
}