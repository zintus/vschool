#pragma strict

var Bootstrap : GameObject;
var HallwayGroup : GameObject;

function OnTriggerEnter() {
	HallwayGroup.GetComponent.<HallwayAchievements>().Check(this.name, "");
}