function OnMouseDown() {
    
	print ("Answer: ");
	
	var scrb = GameObject.Find("Plane_RightButton").GetComponent("RightButtonScript");
	GameObject.Find("Code_Panel").transform.position.z = 29.01155;
	if (!scrb.animation_in_progress) {
	
		var scr = GameObject.Find("BoardGroup").GetComponent("BoardScript");
		var anim = GameObject.Find("BoardGroup").GetComponent(Animation);
	
	
		scr.i = scr.i + 1;
		if (scr.i >= scr.qText.length) scr.i = 0;
		anim.Play("BoardAnim");
		
		if (scrb.pic_enlarged) {
			var animb = GameObject.Find("Plane_RightButton").GetComponent(Animation);
			animb.Play("PictureAnimDown");
			scrb.pic_enlarged = false;
		}
		
		
	}
	
}