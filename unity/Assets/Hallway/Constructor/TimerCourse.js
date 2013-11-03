#pragma strict

private var sp : StatisticParser;
private var flag = false;
var TextTime : GameObject;
var Bootstrap : GameObject;

function Start() {
	sp = Bootstrap.GetComponent.<StatisticParser>();
}

function UpdateClock() {
	var hours = Mathf.FloorToInt(sp.STAT.timeSpent/3600.00);
	var minutes = Mathf.FloorToInt((sp.STAT.timeSpent - hours*3600)/60.00);
	var seconds = Mathf.FloorToInt(sp.STAT.timeSpent - hours*3600 - minutes*60);
	var s = "";
	s += hours.ToString(); s += ":";
	if (minutes<10) s += "0"; s += minutes.ToString(); 	s += ":";
	if (seconds<10) s += "0"; s += seconds.ToString();
	TextTime.GetComponent(TextMesh).text = s;
}

function Update() {
	if (flag) {
		var prev = Mathf.FloorToInt(sp.STAT.timeSpent);
		sp.STAT.timeSpent += Time.deltaTime; //прибавляем время, которое длится один кадр
		if (Mathf.FloorToInt(sp.STAT.timeSpent) > prev)
			UpdateClock(); //если началась новая секунда, то надо обновить часы на мониторе
	}	
}

function OnTriggerEnter() {
	//print("Course Corridor - Enter");
	flag = true;
	UpdateClock();
}

function OnTriggerExit() {
	//print("Course Corridor - Exit");
	flag = false;
}