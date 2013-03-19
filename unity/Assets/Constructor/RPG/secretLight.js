#pragma strict

var HallwayGroup : GameObject;

function OnTriggerEnter () {	
	HallwayGroup.GetComponent.<HallwayAchievements>().Check(this.name, "");
}