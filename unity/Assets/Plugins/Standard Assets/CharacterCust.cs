using UnityEngine;
using System.Collections;

public class CharacterCust : MonoBehaviour
{
	//positions
	//float y = 2.0f, z = 31.0f, xLeft = 20.0f, xMiddle = 21.5f, xRigth = 23.0f;
	Vector3 leftPosition = new Vector3(20.0f, 2.0f, 31.0f);
	Vector3 middlePosition = new Vector3(21.5f, 2.0f, 31.0f);
	Vector3 rigthPosition = new Vector3(23.0f, 2.0f, 31.0f);
	
	//avatars
	public static string nameOfAvatar;
	
	public GameObject Robot;
	public GameObject Joan;
	public GameObject Alexis;
	public GameObject Golem;
    public GameObject Justin;
	public GameObject Vincent;
	public GameObject Solider;
	public GameObject Mia;
	
	//effects
	public GameObject Fire;
	public GameObject Sparks;
	public GameObject Explosions;
	public GameObject Fireworks;
	
	public GameObject Observation;
	
	int curCharacter = 0;
	bool closerCamera = false;

	GameObject [] characters;
	
	// Use this for initialization
	void Start () 
	{	
		characters = new GameObject[]{Robot, Joan, Alexis, Justin, Vincent, Solider, Mia};
		ChangeCharecters(curCharacter);
	}	
	
	void commonButtons(int wRegularButton, int wBigButton, int hUnit)
	{
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("<", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)) && curCharacter > 0)
            ChangeCharecters(--curCharacter);
		
        if(GUILayout.Button(Strings.Get("Go"), GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)))
		{
			nameOfAvatar = characters[curCharacter].name;
			Debug.Log(nameOfAvatar);			
			Application.LoadLevel("world");
		}
        if (GUILayout.Button(">", GUILayout.Width(wRegularButton), GUILayout.Height(hUnit)) && curCharacter < characters.Length - 1)
           ChangeCharecters(++curCharacter);
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
	
	
	void ChangeCharecters(int curCharacter)
	{	
		Debug.Log(characters[curCharacter].name + " # " + curCharacter);
		for(int i = 0; i < characters.Length; i++)
				characters[i].SetActive(false);
		characters[curCharacter].SetActive(true);
	}
	

}