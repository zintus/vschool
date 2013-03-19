#pragma strict

var theme_num;
var lec_num;

private var sp : StatisticParser;
private var flag = false;
var Bootstrap : GameObject;

function Start() {
	sp = Bootstrap.GetComponent.<StatisticParser>();
}

function Update() {
	if (flag) {
		sp.STAT.timeSpent += Time.deltaTime;
		sp.STAT.themesRuns[theme_num].timeSpent += Time.deltaTime;
		sp.STAT.themesRuns[theme_num].lecturesRuns[lec_num].timeSpent += Time.deltaTime;
		//print(theme_num.ToString()+" "+lec_num.ToString()+" "+sp.STAT.themesRuns[theme_num].lecturesRuns[lec_num].timeSpent.ToString());
	}	
}

function OnTriggerEnter() {
	//print("Lecture Room - Enter");
	flag = true;
}

function OnTriggerExit() {
	//print("Lecture Room - Exit");
	flag = false;
}