var looking_at_question = true;

function OnMouseDown() {
	var scr = GameObject.Find("BoardGroup").GetComponent("BoardScript");
	if (looking_at_question) {
		looking_at_question = false;
		renderer.material = Resources.Load("button_question");
		//GameObject.Find("Text_Question").GetComponent(TextMesh).text = scr.qAns[scr.i];
		//print("qwerty");
		//transform.parent.GameObject.Find("Code_Panel").renderer.enabled = true;
		
		//var txt = transform.parent.transform.Find("Code_Panel");
		//txt.renderer.enabled=true;
		//transform.parent.GameObject.Find("Code_Panel").renderer.enabled = true;
		GameObject.Find("Code_Panel").transform.position.z = 22.80875;
		/*GameObject.Find("B Enter").renderer.enabled = false;
		GameObject.Find("G Enter").renderer.enabled = false;
		GameObject.Find("T Enter").renderer.enabled = false;
		
		GameObject.Find("B Reset").renderer.enabled = false;
		GameObject.Find("G Reset").renderer.enabled = false;
		GameObject.Find("T Reset").renderer.enabled = false;
		
		GameObject.Find("B0").renderer.enabled = false;
		GameObject.Find("G0").renderer.enabled = false;
		GameObject.Find("T0").renderer.enabled = false;
		
		GameObject.Find("B1").renderer.enabled = false;
		GameObject.Find("G1").renderer.enabled = false;
		GameObject.Find("T1").renderer.enabled = false;
		
		GameObject.Find("B2").renderer.enabled = false;
		GameObject.Find("G2").renderer.enabled = false;
		GameObject.Find("T2").renderer.enabled = false;
		
		GameObject.Find("B3").renderer.enabled = false;
		GameObject.Find("G3").renderer.enabled = false;
		GameObject.Find("T3").renderer.enabled = false;
		
		GameObject.Find("B4").renderer.enabled = false;
		GameObject.Find("G4").renderer.enabled = false;
		GameObject.Find("T4").renderer.enabled = false;
		
		GameObject.Find("B5").renderer.enabled = false;
		GameObject.Find("G5").renderer.enabled = false;
		GameObject.Find("T5").renderer.enabled = false;
		
		GameObject.Find("B6").renderer.enabled = false;
		GameObject.Find("G6").renderer.enabled = false;
		GameObject.Find("T6").renderer.enabled = false;*/
		
		//GameObject.Find("Sphere125").renderer.enabled = false;
		//transform.parent.GameObject.Find("Sphere125").renderer.enabled = false;
	    //GameObject.Find("Plane_Board").renderer.enabled = false;
		///transform.parent.transform.Find("Code_Panel").transform.Find("B Enter Group").GameObject.Find("B Enter").renderer.enabled = false;
		//transform.parent.transform.Find("Code_Panel").transform.Find("B Enter Group").GameObject.Find("G Enter").renderer.enabled = false;
		//transform.parent.transform.Find("Code_Panel").transform.Find("B Enter Group").GameObject.Find("T Enter").renderer.enabled = false;
		//print("111111");   
		//GameObject.Find("B Enter").renderer.enabled = true;
		//GameObject.Find("G Enter").renderer.enabled = true;
		//GameObject.Find("T Enter").renderer.enabled = true;
		
		
		
	} else {
		looking_at_question = true;
		GameObject.Find("Code_Panel").transform.position.z = 28;
		renderer.material = Resources.Load("button_answers");
		GameObject.Find("Text_Question").renderer.enabled = true;
		GameObject.Find("Plane_Pic_Answers").renderer.enabled = false;
		GameObject.Find("Text_Question").GetComponent(TextMesh).text = scr.qText[scr.i];
	}
}