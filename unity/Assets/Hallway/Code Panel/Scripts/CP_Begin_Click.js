//������ �� ������� ������� ������, �� ������, ����������� � ������� ������, � �� ���������
//�������� ��� ������ ���������� ����� � ���������� ����� �������������� �� ��� ��������
var MainCam : Camera;
var PanelCam : Camera;
var PlayerAvatar : GameObject;

public var dieSignals : SignalSender;
//������� ����, ����������� �� ������������ ������� ����� ��� ���
var panel_activated = false;
var hint_visible = false;
var finished = false;

PanelCam.enabled = false; PanelCam.GetComponent(AudioListener).enabled = false;

function Update() {
	if (!finished) {
	
	if ((!hint_visible) && (!panel_activated) &&
	    (Mathf.Abs(PlayerAvatar.transform.position.x - transform.position.x) < 0.5) &&
		(Mathf.Abs(PlayerAvatar.transform.position.y - transform.position.y) < 2) &&
		(Mathf.Abs(PlayerAvatar.transform.position.z - transform.position.z) < 1)
	   ) {
		transform.Find("GUI Hint").gameObject.active = true; hint_visible = true;
	} else
	if ((hint_visible) && (!panel_activated) &&
		((Mathf.Abs(PlayerAvatar.transform.position.x - transform.position.x) >= 0.5) ||
		(Mathf.Abs(PlayerAvatar.transform.position.y - transform.position.y) >= 2) ||
		(Mathf.Abs(PlayerAvatar.transform.position.z - transform.position.z) >= 1))
	   ) {
		transform.Find("GUI Hint").gameObject.active = false; hint_visible = false;
	}  
	
	if ((!panel_activated) && (hint_visible) && (Input.GetKeyDown("e"))) {
		transform.Find("GUI Hint").gameObject.active = false;
		PlayerAvatar.SetActive(false);
		MainCam.enabled = false; MainCam.GetComponent(AudioListener).enabled = false;
		PanelCam.enabled = true; PanelCam.GetComponent(AudioListener).enabled = true;
								
		GetComponent(BoxCollider).size.x = 0;
		GetComponent(BoxCollider).size.y = 0;
		GetComponent(BoxCollider).size.z = 0;
		panel_activated = true;
	}
	
	if (panel_activated) {
		if (Input.GetKeyDown("escape")) {
			MainCam.enabled = true; MainCam.GetComponent(AudioListener).enabled = true;
			PanelCam.enabled = false; PanelCam.GetComponent(AudioListener).enabled = false;
			PlayerAvatar.SetActive(true); PlayerAvatar.animation.Play("idle");
			
			GetComponent(BoxCollider).size.x = 1.9;
			GetComponent(BoxCollider).size.y = 3;
			GetComponent(BoxCollider).size.z = 1;
			panel_activated = false;
		}
	}
	
	}
}

function Finish() {
	MainCam.enabled = true; MainCam.GetComponent(AudioListener).enabled = true;
	PanelCam.enabled = false; PanelCam.GetComponent(AudioListener).enabled = false;
	PlayerAvatar.SetActive(true); PlayerAvatar.animation.Play("idle");
	GetComponent(BoxCollider).size.x = 1.9;
	GetComponent(BoxCollider).size.y = 3;
	GetComponent(BoxCollider).size.z = 1;
	panel_activated = false;
	
	finished = true;
	dieSignals.SendSignals (this);
	
}

//for quick test mode, open immediately
//function Start() { dieSignals.SendSignals (this); }