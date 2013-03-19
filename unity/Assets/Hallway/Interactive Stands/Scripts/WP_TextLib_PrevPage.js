#pragma strict

var background: GameObject;
var pic: GameObject;
var script_name = "TextLib_Stands_Version";

function OnMouseDown() {
	var scr : TextLib_Stands_Version = background.GetComponent.<TextLib_Stands_Version>();
	scr.current_page = scr.current_page - 1;
	if (scr.current_page<1) scr.current_page = scr.pages_number;
 	scr.c.GetComponent(TextMesh).text = "Стр."+scr.current_page+" из "+scr.pages_number;
 	
 	if (scr.current_page != scr.pages_number) {
 		scr.t.active = true; pic.active = false;
 		scr.t.GetComponent(TextMesh).text = scr.p[scr.current_page-1];
 	} else {
 		scr.t.active = false; pic.active = true;
 	}
 	
 	scr.CheckIfComplete();
}