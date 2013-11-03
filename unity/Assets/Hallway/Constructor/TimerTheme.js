#pragma strict

var theme_num;

private var sp : StatisticParser;
private var flag = false;
var TextTime : GameObject;
var Bootstrap : GameObject;

function Start() {
	sp = Bootstrap.GetComponent.<StatisticParser>();	
}

function UpdateClock() {
	var tr = sp.STAT.themesRuns[theme_num];
	var hours = Mathf.FloorToInt(tr.timeSpent/3600.00);
	var minutes = Mathf.FloorToInt((tr.timeSpent - hours*3600)/60.00);
	var seconds = Mathf.FloorToInt(tr.timeSpent - hours*3600 - minutes*60);
	var s = "";
	s += hours.ToString(); s += ":";
	if (minutes<10) s += "0"; s += minutes.ToString(); 	s += ":";
	if (seconds<10) s += "0"; s += seconds.ToString();
	TextTime.GetComponent(TextMesh).text = s;
}

function Update() {
	if (flag) {
		var tr = sp.STAT.themesRuns[theme_num];
		var prev = Mathf.FloorToInt(tr.timeSpent);
		//наращиваем как время этой темы, так и время всего курса
		sp.STAT.timeSpent += Time.deltaTime;
		tr.timeSpent += Time.deltaTime;
		if (Mathf.FloorToInt(tr.timeSpent) > prev) UpdateClock();
	}	
}

function OnTriggerEnter() {
	//print("Theme Corridor - Enter");
	flag = true;
	UpdateClock();
}

function OnTriggerExit() {
	//print("Theme Corridor - Exit");
	flag = false;
}