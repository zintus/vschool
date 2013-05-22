using UnityEngine;
using System.Collections;

public class NetworkManagerScript : MonoBehaviour {
	
	private GameObject avatar;
	private GameObject avatarCamera;
	public Transform spawnObject;
	public string gameName = "3Ducation";
	public GameObject Lerpz;
	public GameObject AngryBot;
	public GameObject LerpzCamera;
	public GameObject AngryBotCamera;
	public GameObject cameraScript;
	
	private string nameOfAvatar;
	
	private bool refreshing;
	private HostData[] hostData;
	
	private float btnX;
	private float btnY;
	private float btnW;
	private float btnH;
	
	void Start () {
		btnX = Screen.width * 0.05f;
		btnY = Screen.width * 0.05f;
		btnW = Screen.width * 0.1f;
		btnH = Screen.width * 0.1f;
		switch(CharacterCust.nameOfAvatar)
		{
			case "Lerpz": avatar = Lerpz; avatarCamera=LerpzCamera; break;
			case "AngryBot": avatar = AngryBot; avatarCamera=AngryBotCamera; break;
		}
		/*if(GameObject.Find("Lerpz")) avatar = GameObject.Find("Lerpz");
		if(GameObject.Find("Worker")) avatar = GameObject.Find("Worker");
		if(GameObject.Find("AngryBot")) avatar = GameObject.Find("AngryBot");
		if(GameObject.Find("OldMan")) avatar = GameObject.Find("OldMan");
		if(GameObject.Find("Man")) avatar = GameObject.Find("Man");
		if(GameObject.Find("Woman")) avatar = GameObject.Find("Woman");
		if(GameObject.Find("Girl")) avatar = GameObject.Find("Girl");
		if(GameObject.Find("Boy")) avatar = GameObject.Find("Boy");*/
		if(avatar != null)
		{
			avatar.transform.position = new Vector3(-31.3F, 1F, -29.7F);
			avatar.transform.Rotate(0,90,0);
			avatar.GetComponent<ThirdPersonController>().enabled = true;
			OrbitCam oc = cameraScript.GetComponent<OrbitCam>();
			oc.target = avatarCamera.transform;
		}
	}
	
	void StartServer(){
		Network.InitializeServer(32, 25001, !Network.HavePublicAddress());
		MasterServer.RegisterHost(gameName, "3Ducation", "This is the network version of the education");
	}
	
	void RefreshHostList(){
		MasterServer.RequestHostList(gameName);
		refreshing = true;		
	}
	
	void Update(){
		if(refreshing){
			if(MasterServer.PollHostList().Length > 0){
				refreshing = false;
				Debug.Log(MasterServer.PollHostList().Length);
				hostData = MasterServer.PollHostList(); 
			}
		}
	}
	
	void SpawnPlayer(){
		Network.Instantiate(avatar, spawnObject.position, Quaternion.identity, 0);
	}
	
	void OnServerInitialized(){
		Debug.Log("Server initialized!");
		SpawnPlayer();
	}
	
	void OnConnectedToServer(){
		SpawnPlayer();
	}
	
	void OnMasterServerEvent(MasterServerEvent mse){
		if(mse == MasterServerEvent.RegistrationSucceeded){
			Debug.Log("Registered Server!");
		}
	}
	
	void OnGUI(){
		if(!Network.isClient && !Network.isServer) {
			if(GUI.Button(new Rect(btnX, btnY, btnW, btnH), "Start Server")){
				Debug.Log("Starting Server");
				StartServer();
			}
			
			if(GUI.Button(new Rect(btnX, btnY * 1.2f + btnH, btnW, btnH), "Refresh Hosts")){
				Debug.Log("Refreshing");
				RefreshHostList();
			}
			
			if(hostData != null){
				for(int i = 0; i < hostData.Length; i++){
					if(GUI.Button(new Rect(btnX * 1.5f + btnW, btnY * 1.2f + (btnH * i), btnW * 3, btnH * 0.5f), hostData[i].gameName)){
						Network.Connect(hostData[i]);
					}
				}
			}
		}
	}
	
}
