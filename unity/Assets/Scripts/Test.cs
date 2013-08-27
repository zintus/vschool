using UnityEngine;
using System.Collections;

public class Test : MonoBehaviour
{
	
	//avatars
	public static string nameOfAvatar;
	public GameObject Lerpz;
	public GameObject Worker;
	public GameObject AngryBot;
	
	public GameObject Alexis;
	public GameObject Joan;
	public GameObject Mia;
	public GameObject Carl;
	public GameObject Justin;
	public GameObject Vincent;
	public GameObject Solider;
	public GameObject Golem;
	
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
	
	int curPosCam = 0, curCharacter = 1, curClothes = 0;
	bool closerCamera = false;
	
	GameObject [] massCharMeshes;
	GameObject [] massChar;	
	Material [] materials;
	GameObject [] Characters;
	
/*	void loopAnimations()
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
	*/
	// Use this for initialization
	void Start () 
	{	
		/*loopAnimations();
		
		massCharMeshes = new GameObject[]{
			Man.transform.Find("Human_001").gameObject,
			Woman.transform.Find("Human_002").gameObject,
			Boy.transform.Find("Human_005").gameObject,
			Girl.transform.Find("Human").gameObject,
			OldMan.transform.Find("Human_004").gameObject
		};
		massChar = new GameObject[]{Man, Woman, Boy, Girl, OldMan};
		materials = new Material[]{mat0,mat1,mat2,mat3,mat4,mat5,mat6,mat7,mat8,mat9};*/
		Characters = new GameObject[]{Lerpz, Alexis, Joan, Mia, Justin, Vincent,  Solider, Golem};
		
	}	
	
	void commonButtons(int wRegularButton, int wBigButton, int hUnit)
	{
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("<", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
            ChangeCharecters(-1);
		
        if(GUILayout.Button(Strings.Get("Go"), GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
		{
			GameObject avatar = null;
			
			avatar = Characters[curCharacter];
			nameOfAvatar = avatar.name;
			Debug.Log(nameOfAvatar);
			Application.LoadLevel("world");
		}
        if (GUILayout.Button(">", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
           ChangeCharecters(1);
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
			
			GUILayout.EndArea();
		}
	}
	
	
	void ChangeCharecters(int direction)
	{	
		Fire.SetActive(true);		
		if (curCharacter>0){Characters[curCharacter-direction].SetActive(false);}
		if (direction == 1) {
			Characters[curCharacter].transform.Translate(new Vector3(-2.0f, 0.0f, 0.0f));
		curCharacter += direction;
		Characters[curCharacter].transform.Translate(new Vector3(-2.0f, 0.0f, 0.0f));
		}
		else {Characters[curCharacter].transform.Translate(new Vector3(2.0f, 0.0f, 0.0f));
		curCharacter += direction;
		Characters[curCharacter].transform.Translate(new Vector3(2.0f, 0.0f, 0.0f));}
		
		
		if (curCharacter<Characters.Length) {Characters[curCharacter+direction].SetActive(true);}
		if (curCharacter == Characters.Length) curCharacter = 0;
		if (curCharacter == -1) curCharacter = Characters.Length - 1;
		
		
	}
	
	
}