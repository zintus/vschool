using UnityEngine;
using System.Collections;

public class WomanNPCControl : MonoBehaviour {/*

	ControlPerson control;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	
	void Update () {
		control.Timer();//запускаем таймер у объекта контрол
		ControlPerson();//вызываем метод, который будет проверять время и действие
	}
	
	void Awake()
	{
		control = new ControlPerson();
		//if(GameObject.Find("WomanNPC"))
		//	print ("NPCDetected");				для отладки
		control.SetCharacter(GameObject.Find("WomanNPC"));
	}
	//Получается такой как бы скриптик, под который можно подстроить 
	//любой объект
	void ControlPerson()
	{
		control.Action(1,10,"idle");
		control.Action (10,11,"turn",180);
		control.Action(11,14,"walk");
		control.Action(14,15,"turnAndWalk",-90);
		control.Action(15,20,"idle");
		control.Action (20,22,"turnAndWalk",90);
		control.Action(22,23,"walk");
		control.Action (23,25,"turnAndWalk",45);
		control.Action(25,26,"idle");
		control.Action(26,27,"jump");
		control.Action(27,28,"idle");
		control.Action (28,33,"turnAndWalk",-135);
		control.Action(33,34,"walk");
		control.Action (34,35,"turnAndWalk",-90);
		control.Action(35,38,"idle");
		control.Action (38,39,"turnAndWalk",180);
		control.Action(39,40,"walk");//односекундный walk нужен для сброса параметра 
		//rotate, т.к. если бы его не было то перснаж вращался бы на месте по несколько раз в секунду
		//решение дибильное, но другого пока не придумал
		control.Action (40,42,"turnAndWalk",45);
		control.Action(42,43,"idle");
		control.Action(43,44,"turn",-90);
		control.Action(44,48,"idle");
		control.Action (48,53,"turnAndWalk",180);
		control.Action(53,54,"walk");
		control.Action (54,59,"turnAndWalk",45);
		control.Action(59,60,"jump");
		control.Action(60,61,"toPosition");
		control.Action(61,62,"circle");//зацикливает скрипт, сбросом таймера
	}
*/}
