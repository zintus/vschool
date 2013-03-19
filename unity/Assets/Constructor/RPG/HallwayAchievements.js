#pragma strict

var Bootstrap : GameObject;
var facultyStands = new Array();
var ladders = new Array();
var light1 = false; var light2 = false; var light3 = false;

function Start() {
	for (var i=0; i<10; i++) facultyStands[i] = false;
	for (i=0; i<8; i++) ladders[i] = false;
}

function Check(objname:String, addInfo:String) {
	var scr : RPGParser = Bootstrap.GetComponent.<RPGParser>();
	var lng : Languages = Bootstrap.GetComponent.<Languages>();
	var index; var i : int;
	
	if (objname.Substring(0, objname.Length - 2) == "WallScreen") {
		if (!scr.RPG.facultyStands_Seen) {
			if (!lng.eng) scr.Achievement("Обнаружены стенды о факультетах!\n+10 очков!", 10);
			else scr.Achievement("Faculty stands are discovered!\n10 points!", 10);
			scr.RPG.facultyStands_Seen = true;
		}
		if (!scr.RPG.facultyStands_Finish) {
			index = System.Int32.Parse(objname.Substring(objname.Length - 2, 2)) - 1;
			facultyStands[index] = true;
			i = 0;
			while ((i < 10) && (facultyStands[i])) i++;			
			if (i == 10) {
				if (!lng.eng) scr.Achievement("Изучены все стенды о факультетах!\n+20 очков!", 20);
				else scr.Achievement("All faculty stands are studied!\n20 points!", 20);
				scr.RPG.facultyStands_Finish = true;
			}
		}	
	}
	
	if (objname.Substring(0, objname.Length - 1) == "Ladder") {
		if (!scr.RPG.ladderJump_First) {
			if (!lng.eng) scr.Achievement("Прыжок на лесенку!\n+10 очков!", 10);
			else scr.Achievement("Jump on a ladder!\n10 points!", 10);
			scr.RPG.ladderJump_First = true;
		}
		if (!scr.RPG.ladderJump_All) {
			index = System.Int32.Parse(objname.Substring(objname.Length - 1, 1)) - 1;
			ladders[index] = true;			
			i = 0;
			while ((i < 8) && (ladders[i])) i++;			
			if (i == 8) {
				if (!lng.eng) scr.Achievement("Посещены все лесенки!\n+30 очков!", 30);
				else scr.Achievement("All ladders are visited!\n30 points!", 30);
				scr.RPG.ladderJump_All = true;
			}
		}
	}
	
	if ((!scr.RPG.letThereBeLight) && ((objname == "Light1") || (objname == "Light2") || (objname == "Light3"))) {
		if (objname == "Light1") light1 = true;
		else if (objname == "Light2") light2 = true;
		else if (objname == "Light3") light3 = true;
		if (light1 && light2 && light3) {
			if (!lng.eng) scr.Achievement("Изучена система освещения!\n+50 очков!", 50);
			else scr.Achievement("Illumination system is investigated!\n50 points!", 50);
			scr.RPG.letThereBeLight = true;
		}
	}
	
	if (objname == "Stand about History") {
		if (!scr.RPG.historyStand_Seen) {
			if (!lng.eng) scr.Achievement("Обнаружен стенд об истории кафедры!\n+10 очков!", 10);
			else scr.Achievement("The department history stand is discovered!\n10 points!", 10);
			scr.RPG.historyStand_Seen = true;
		}
		if ((addInfo == "completed") && (!scr.RPG.historyStand_Finish)) {
			if (!lng.eng) scr.Achievement("Изучена история кафедры!\n+20 очков!", 20);
			else scr.Achievement("History of the department is studied!\n20 points!", 20);
			scr.RPG.historyStand_Finish = true;
		}
	}
	if (objname == "Stand about Science") {
		if (!scr.RPG.scienceStand_Seen) {
			if (!lng.eng) scr.Achievement("Обнаружен стенд о научной работе!\n+10 очков!", 10);
			else scr.Achievement("The department science stand is discovered!\n10 points!", 10);
			scr.RPG.scienceStand_Seen = true;
		}
		if ((addInfo == "completed") && (!scr.RPG.scienceStand_Finish)) {
			if (!lng.eng) scr.Achievement("Изучен стенд о научной работе!\n+20 очков!", 20);
			else scr.Achievement("The department science stand is studied!\n20 points!", 20);
			scr.RPG.scienceStand_Finish = true;
		}
	}
	if (objname == "Stand about Staff") {
		if (!scr.RPG.staffStand_Seen) {
			if (!lng.eng) scr.Achievement("Обнаружен стенд о преподавателях!\n+10 очков!", 10);
			else scr.Achievement("The staff stand is discovered!\n10 points!", 10);
			scr.RPG.staffStand_Seen = true;
		}
		if ((addInfo == "completed") && (!scr.RPG.staffStand_Finish)) {
			if (!lng.eng) scr.Achievement("Изучен стенд о преподавателях!\n+20 очков!", 20);
			else scr.Achievement("The staff stand is studied!\n20 points!", 20);
			scr.RPG.staffStand_Finish = true;
		}
	}	
}