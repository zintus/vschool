#pragma strict

var theme_num;
var test_num;

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
		//sp.STAT.themesRuns[theme_num].testsRuns[test_num].timeSpent += Time.deltaTime;
		//print(theme_num.ToString()+" "+test_num.ToString()+" "+sp.STAT.themesRuns[theme_num].testsRuns[test_num].timeSpent.ToString());
	}	
}

function OnTriggerEnter() {
	//print("QuizRoomA - Enter");
	flag = true;
}

function OnTriggerExit() {
	//print("QuizRoomA - Exit");
	flag = false;
}