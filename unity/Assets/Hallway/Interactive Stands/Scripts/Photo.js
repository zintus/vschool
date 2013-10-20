#pragma strict

private var chosen = false;
private var animation_number = 0;

private var start_pos : Vector3;
private var start_scale : Vector3;
private var end_pos = Vector3(-0.55, 0, -0.035);
private var end_scale = Vector3(4.2, 4.2, 4.2);

private var info : GameObject;
private var info_start_x = -0.5;
private var info_end_x = 0.55;

function Update () {
	switch (animation_number) {
		case 1:
			transform.Translate(2*(end_pos.x - start_pos.x)*Time.deltaTime, 0, 0);
			transform.Translate(0, 2*(end_pos.y - start_pos.y)*Time.deltaTime, 0);
			transform.localScale += 2*(end_scale - start_scale)*Time.deltaTime;
			if (transform.localScale.x >= end_scale.x) {
				transform.localScale = end_scale;
				transform.localPosition = end_pos;
				
				animation_number = 3;
				info = transform.parent.transform.Find("Info").gameObject;
				info.SetActiveRecursively(true);
				info.transform.Find("Text").GetComponent(TextMesh).text = 
					transform.parent.GetComponent.<Photo_General>().GetDescription(name);
					transform.parent.GetComponent.<Photo_General>().CheckIfComplete(name);
			}	
		break;
			
		case 2:
			transform.Translate(2*(start_pos.x - end_pos.x)*Time.deltaTime, 0, 0);
			transform.Translate(0, 2*(start_pos.y - end_pos.y)*Time.deltaTime, 0);
			transform.localScale += 2*(start_scale - end_scale)*Time.deltaTime;
			if (transform.localScale.x <= start_scale.x) {
				transform.localScale = start_scale;
				transform.localPosition = start_pos;
				transform.localPosition.z = start_pos.z;
				animation_number = 0;
				
				transform.parent.GetComponent.<Photo_General>().someone_chosen = false;
				chosen = false;
			}	
		break;
		
		case 3:
			info.transform.Translate((info_end_x - info_start_x)*Time.deltaTime, 0, 0);
			if (info.transform.localScale.x < 1) info.transform.localScale.x += 1*Time.deltaTime;
			if (info.transform.localPosition.x >= info_end_x) {
				info.transform.localPosition.x = info_end_x;
				info.transform.localScale.x = 1;
				animation_number = 0;
			}
		break;
			
		case 4:
			info.transform.Translate((info_start_x - info_end_x)*Time.deltaTime, 0, 0);
			if (info.transform.localScale.x > 0.5) info.transform.localScale.x -= 1*Time.deltaTime;
			if (info.transform.localPosition.x <= info_start_x) {
				info.transform.localPosition.x = info_start_x;
				info.transform.localScale.x = 0.5;
				
				info = transform.parent.transform.Find("Info").gameObject;
				info.SetActiveRecursively(false);
				animation_number = 2;
			}
		break;
	}
}

function OnMouseDown() {
	var scr = transform.parent.GetComponent.<Photo_General>();
	
	if ((animation_number == 0) && (!scr.someone_chosen) && (!chosen)) {
		scr.someone_chosen = true;
		chosen = true;
		animation_number = 1;
		start_pos = transform.localPosition;
		start_scale = transform.localScale;
		transform.localPosition.z = end_pos.z;
	}
	
	if ((animation_number == 0) && (chosen)) {
			animation_number = 4;
	}
}