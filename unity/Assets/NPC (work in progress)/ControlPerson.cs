using UnityEngine;
using System.Collections;


public class ControlPerson : MonoBehaviour {/*

	// Use this for initialization
	GameObject player;
	public bool turn = true;
	float time;
	float starttime = Time.time;
	Vector3 position;
	//для работы по таймеру из за проблемы с расходнением расстояния
	//перемещения персонажа по update
	public void Timer()
	{
		time = Time.time - starttime;
		//print(time); для отладки
	}
	
	public float GetTime()
	{
		return time;
	}
	//основной метод, нач время, конечн время, действие. Планирую потом сделать 1 параметр время
	//и действие
	public void Action(float time1,float time2,string action)
	{
		if(time> time1 && time<=time2)
			switch(action)
			{
			case "walk":
			{
				Walk();
				turn = true;
				break;
			}
			case "jump":
			{
				Jump();
				turn = true;
				break;
			}
			case "idle":
			{
				Idle();
				turn = true;
				break;
			}
			case "circle":
			{
				starttime = Time.time;
				break;
			}
			case "toPosition":
			{
				player.transform.position = position;
				break;
			}
		}
	}
	//Перегружен для угла
	public void Action(float time1,float time2,string action,float angle)
	{
		if(time> time1 && time<=time2)
			switch(action)
			{
			case "turnAndWalk":
			{
				Turn(angle);
				Walk();
				break;
			}
			case "turn":
			{
				Turn(angle);
				break;
			}
			}
	}
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		Timer ();
	}
	
	
	public void Walk()
	{
		player.animation.Play("walk");
		Moving();
	}
	
	public void RunForward()
	{
		player.animation.Play("run_forward");
		Moving();
	}
	
	public void Turn(float angle)
	{
		if(turn)
		{
			turn = false;
			player.transform.Rotate(0,angle,0);
		}
	}
	
	public void Run()
	{
		player.animation.Play("run");
		Moving();
	}
	
	public void Idle()
	{
		player.animation.Play("idle");
	}
	
	public void Jump()
	{
		player.animation.Play("jump");
	}
	
	public Vector3 GetPosition()
	{
		return player.transform.position;
	}
	
	public void Moving()
	{
		player.transform.Translate(0,0,3*Time.deltaTime);
	}
	
	public void SetCharacter(GameObject _player)
	{
		player = _player;
		position = player.transform.position;
	}
	
*/}
