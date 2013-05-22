using UnityEngine;
using System.Collections;

public class CharacterCust : MonoBehaviour
{
	//avatars
	public static string nameOfAvatar;
	public GameObject Lerpz;
	public GameObject Worker;
	public GameObject AngryBot;
	
	public GameObject Man;
	public GameObject Woman;
	public GameObject Boy;
	public GameObject Girl;
	public GameObject OldMan;
	
	//effects
	public GameObject Fire;
	public GameObject Sparks;
	public GameObject Explosions;
	public GameObject Fireworks;
	
	public GameObject Observation;
	
	public Material mat0; public Material mat1; public Material mat2;
	public Material mat3; public Material mat4; public Material mat5;
	public Material mat6; public Material mat7; public Material mat8;
	public Material mat9;
	
	int curPosCam = 0, curCharacter = 0, curClothes = 0;
	bool closerCamera = false;
	
	GameObject [] massCharMeshes;
	GameObject [] massChar;	
	Material [] materials;
	
	void loopAnimations()
	{
		Lerpz.animation.wrapMode = WrapMode.Loop;
		Worker.animation.wrapMode = WrapMode.Loop;
		AngryBot.animation.wrapMode = WrapMode.Loop;
		Man.animation.wrapMode = WrapMode.Loop;
		Woman.animation.wrapMode = WrapMode.Loop;
		Boy.animation.wrapMode = WrapMode.Loop;
		Girl.animation.wrapMode = WrapMode.Loop;
		OldMan.animation.wrapMode = WrapMode.Loop;
	}
	
	// Use this for initialization
	void Start () 
	{	
		loopAnimations();
		
		massCharMeshes = new GameObject[]{
			Man.transform.Find("Human_001").gameObject,
			Woman.transform.Find("Human_002").gameObject,
			Boy.transform.Find("Human_005").gameObject,
			Girl.transform.Find("Human").gameObject,
			OldMan.transform.Find("Human_004").gameObject
		};
		massChar = new GameObject[]{Man, Woman, Boy, Girl, OldMan};
		materials = new Material[]{mat0,mat1,mat2,mat3,mat4,mat5,mat6,mat7,mat8,mat9};
		
		EnableLerpz();
	}	
	
	void commonButtons(int wRegularButton, int wBigButton, int hUnit)
	{
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("<", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
            ChangeCharacter(-3);
		
        if(GUILayout.Button(Strings.Get("Go"), GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
		{
			GameObject avatar = null;
			switch(curPosCam)
			{
				case 0 : { avatar = Lerpz; break; }
				case 3 : { avatar = Worker; break; }
				case 6 : { avatar = AngryBot; break; }
				case 9 : { avatar = massChar[curCharacter]; break; }					
			}
			//avatar.transform.parent = null;
			//avatar.transform.position = new Vector3(-31.3F, 2F, -29.7F);
			
			nameOfAvatar = avatar.name;
			Debug.Log(nameOfAvatar);
			//DontDestroyOnLoad(avatar);
			Application.LoadLevel("world");
		}
        if (GUILayout.Button(">", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
            ChangeCharacter(3);
        GUILayout.EndHorizontal();
	}
		
	void OnGUI()
    {
		using (var skin = new DefaultSkin())
		{
			int hUnit = Mathf.RoundToInt(Screen.height * DefaultSkin.LayoutScale);
			int wUnit = Mathf.RoundToInt(Screen.width * DefaultSkin.LayoutScale);
			
			int wRegularButton = wUnit;
			int wBigButton = wUnit * 2;
			int wHugeButton = wUnit * 3;
			
			int blockWidth = wUnit * 3;
			int blockHeight = hUnit * 3;
			int x = (Screen.width/2) - (blockWidth / 2);
			int y = (Screen.height/2) - (blockHeight / 2);
			hUnit /= 2;
			
			GUILayout.BeginArea(new Rect(x, y , blockWidth, blockHeight));
			
			commonButtons(wRegularButton, wBigButton, hUnit);
			
			//last char has some additional buttons
			if (curPosCam == 9) 
			{
				GUILayout.BeginHorizontal();
				if (GUILayout.Button("<", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
	            	ChangePeople(-1);
				
	        	GUILayout.Box(Strings.Get("Character"), GUILayout.Width(wRegularButton), GUILayout.Height(hUnit));
	        	if (GUILayout.Button(">", GUILayout.Width(wUnit), GUILayout.Height(hUnit)))
	            	ChangePeople(1);
				GUILayout.EndHorizontal();
			
				GUILayout.BeginHorizontal();
				if (GUILayout.Button("<", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
	            	ChangeClothes(-1);
				
	        	GUILayout.Box(Strings.Get("Clothes"), GUILayout.Width(wRegularButton), GUILayout.Height(hUnit));
	        	if (GUILayout.Button(">", GUILayout.Width(wUnit), GUILayout.Height(hUnit)))
	           		ChangeClothes(1);
				GUILayout.EndHorizontal();
				
			}
			
			var btnLbl = closerCamera ? Strings.Get("Return") : Strings.Get("Closer");
			GUILayout.BeginHorizontal();
			if (closerCamera)
			{
				Observation.transform.Find("MainCamera").RotateAround(
					Observation.transform.position - new Vector3(0,0,0.8f),
					Vector3.up,
					-20*Time.deltaTime
				);
			}
				
			if (GUILayout.Button(btnLbl, GUILayout.Width(wHugeButton), GUILayout.Height(hUnit)))
			{
				switchCamera();
			}
			
			GUILayout.EndHorizontal();
			GUILayout.EndArea();
		}
	}
	
	void switchCamera()
	{
		var mainCamera = Observation.transform.Find("MainCamera");
		if (closerCamera)
		{
			mainCamera.localPosition = new Vector3(0,3,-10);
			mainCamera.eulerAngles = new Vector3(0,0,0);			
		}
		else
		{
			mainCamera.localPosition = new Vector3(0,3,-3);
			mainCamera.eulerAngles = new Vector3(30,0,0);
		}
		
		closerCamera = !closerCamera;
	}
	
	void ChangePeople(int direction)
	{
		massChar[curCharacter].SetActive(false);
		curCharacter += direction;
		if (curCharacter == massChar.Length) curCharacter = 0;
		if (curCharacter == -1) curCharacter = massChar.Length - 1;	
		massChar[curCharacter].SetActive(true);
		massCharMeshes[curCharacter].renderer.material = materials[curClothes];
		massChar[curCharacter].animation.CrossFade("walk", 0.3F);
	}
		
	void ChangeClothes(int direction)
	{
		curClothes += direction;
		if (curClothes == materials.Length) curClothes = 0;
		if (curClothes == -1) curClothes = materials.Length - 1;
		massCharMeshes[curCharacter].renderer.material = materials[curClothes];
	}
	
	void ChangeCharacter(int trans)
	{
		curPosCam  = curPosCam + trans;
		if (curPosCam == 12) { curPosCam = 0; trans = -9; }
		if (curPosCam == -3) { curPosCam = 9; trans = 9; }
		Observation.transform.Translate(trans,0,0);
		switch (curPosCam)
		{
			case 0:	{ DisableAll(); EnableLerpz();  break; }
			case 3:	{ DisableAll(); EnableWorker();  break; }
			case 6: { DisableAll(); EnableAngryBot(); break; }
			case 9: { DisableAll(); EnableCustom(); break;}
		}
	}
	
	void EnableLerpz()
	{		
		Lerpz.animation.CrossFade("run", 0.5F);
		Fire.SetActive(true);		
	}
	
	void EnableWorker()
	{
		Worker.animation.CrossFade("walk", 0.3F);
		Sparks.SetActive(true);		
	}
	
	void EnableAngryBot()
	{
		AngryBot.animation.CrossFade("run_forward", 0.3F);
		Explosions.SetActive(true);
	}	
	
	void EnableCustom()
	{
		//Fireworks.active = true;
		massChar[curCharacter].animation.CrossFade("walk", 0.3F);
	}
	
	void DisableAll()
	{		
		Lerpz.animation.CrossFade("idle", 0.5F);
		Worker.animation.CrossFade("idle", 0.3F);
		AngryBot.animation.CrossFade("idle", 0.3F);
		massChar[curCharacter].animation.Stop();
				
		Fire.SetActive(false);
		Sparks.SetActive(false);
		Explosions.SetActive(false);
		Fireworks.SetActive(false);
	}
	
}