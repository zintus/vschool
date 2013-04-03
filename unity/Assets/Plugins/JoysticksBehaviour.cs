using UnityEngine;
using System.Collections;

public class JoysticksBehaviour : MonoBehaviour {
	
	//These are being updated by joysticks
	public OrbitCam targetCamera;
	public ThirdPersonController tpc;
	
	//Joysticks respectivly
	public Joystick leftJoystick;
	public Joystick rightJoystick;
	
	void Start () 
	{
		if (InterfaceIdiom.Current == InterfaceIdiom.Values.Desktop)
		{
			gameObject.SetActive(false);
			return;
		}
	}
	
	void Update () 
	{
		if (targetCamera)
		{
            targetCamera.x -= rightJoystick.position.x * 4;
            targetCamera.y += rightJoystick.position.y * 4;
		}
		
		if (tpc)
		{
			tpc.HorizontalAxis = leftJoystick.position.x;
			tpc.VerticalAxis = leftJoystick.position.y;
		}
		
		if (tpc != null && targetCamera != null)
		{
			//Camera updates direction based on character movement direction
			if (tpc.GetSpeed() > 0.1)
				targetCamera.movementDirection = tpc.GetDirection();
			else
				targetCamera.movementDirection = Vector3.zero;
		}
	}
}
