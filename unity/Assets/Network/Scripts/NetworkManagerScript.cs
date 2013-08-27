using UnityEngine;
using System.Collections;

public class NetworkManagerScript : MonoBehaviour {
	
	private GameObject avatar;
	private GameObject avatarCamera;
	public Transform spawnObject;
	public string gameName = "3Ducation";
	public GameObject Lerpz;
	public GameObject AngryBot;
	public GameObject Alexis;
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
		Debug.Log("Avatar is " + CharacterCust.nameOfAvatar);
		switch(CharacterCust.nameOfAvatar)
		{
			case "Lerpz": avatar = Lerpz; break;
			case "AngryBot": avatar = AngryBot;  break;
			case "AlexisPref": avatar = Alexis; break;
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
				Camera.mainCamera.GetComponent<OrbitCam>().target = avatar.transform;
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
