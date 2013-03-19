var DebugViewpoint : GameObject;

function Update () {
	if (Input.GetKey(KeyCode.U)) transform.position = DebugViewpoint.transform.position;
	//это мы включаем/выключаем скайбокс
	if (Input.GetKeyDown(KeyCode.V)) transform.Find("Main Camera").GetComponent(Skybox).enabled =
		! (transform.Find("Main Camera").GetComponent(Skybox).enabled);
	//а это я в лекционку прыгал, когда отлаживал картинки, чтобы постоянно не бегать
	if (Input.GetKey(KeyCode.L)) transform.position = Vector3(-70,50,5);
	
}