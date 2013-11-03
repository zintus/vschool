var phase = 0;
var animation_in_progress = false;
var animation_number = 0;
var chosen = false;
var t1 = 0.0;
var t2 = 1.0;
var rand;

function AnimationA() {
	if (phase == 1) {
		transform.Translate(0, 0, 18*Time.deltaTime);
		if (transform.position.z >= 12) { phase = 0; animation_in_progress = false; }
	}
}

function AnimationB() {
	if (phase == 1) {	
		t1 = t1 + 0.01;
		transform.parent.transform.Translate(0, 0, 12*Time.deltaTime);
		transform.Rotate(-720*Time.deltaTime, 0, 0);
		transform.parent.transform.position.y = 15*t1 - 23*t1*t1;
		if (transform.position.z >= 12) {
			phase = 0; animation_in_progress = false;
			transform.rotation.x = 0; transform.rotation.y = 0; 
			transform.rotation.z = 180; t1 = 0.0;
			transform.parent.transform.position.y = 0;
			transform.parent.transform.position.z = 0;
			transform.position.z = 12;
		}
	}	
}

function AnimationC() {
	if (phase == 1) {
		t2 = t2 - 2*Time.deltaTime;
		transform.localScale.x = t2;
		transform.localScale.y = t2;
		transform.localScale.z = t2;
		if (t2 <= 0) phase = 2;
	}
	if (phase == 2) {
		transform.Translate(0, -2, 12); phase = 3;
	}
	if (phase == 3) {
		t2 = t2 + 2*Time.deltaTime;
		transform.localScale.x = t2;
		transform.localScale.y = t2;
		transform.localScale.z = t2;
		if (t2 >= 1) phase = 4;
	}
	if (phase == 4) {
		transform.Translate(0, 10*Time.deltaTime, 0);
		if (transform.position.y <= 0.5) {
			phase = 0; animation_in_progress = false;
			transform.position.y = 0.5;
		}
	}
}

function ReturnAnimation() {
	if (phase == 1) {
		transform.Translate(0, 3*Time.deltaTime, 0);
		if (transform.position.y <= -0.55) { phase = 2; }
	}
	if (phase == 2) {
		transform.position.z = 0; phase = 3;
	}
	if (phase == 3) {
		transform.Translate(0, -3*Time.deltaTime, 0);
		if (transform.position.y >= 0.5) {
			phase = 0; animation_in_progress = false;
			transform.position.y = 0.5;
		}
	}
}

function Update() {
	switch (animation_number) {
	case 1: AnimationA(); break;
	case 2: AnimationB(); break;
	case 3: AnimationC(); break;
	case 6: ReturnAnimation(); break;
	}
}

function OnMouseDown () {
	if (!animation_in_progress) {
		if (!chosen) {
			rand = Random.Range(0, 3);
			if (rand == 0) animation_number = 1;
			else if (rand == 1) animation_number = 2;
			else animation_number = 3;
			phase = 1; chosen = true;
		}
		else { animation_number = 6; phase = 1; chosen = false; }
		animation_in_progress = true;
	}
}