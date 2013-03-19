using System;
using UnityEngine;

public class InterfaceIdiom
{
	public static Values Current
	{
		get; set;
	}
	
	public enum Values
	{
		Desktop,
		Phone,
		Tablet
	}
	
	static InterfaceIdiom ()
	{
		Debug.Log(string.Format("Started with {0} system", SystemInfo.operatingSystem));
	
		var platform = Application.platform;
		switch (platform)
		{
			case RuntimePlatform.Android:
			case RuntimePlatform.IPhonePlayer:
			{
				var osStr = SystemInfo.operatingSystem;
				if (osStr.Contains("iPhone"))
				{
					Current = Values.Phone; 
					break;
				}
				if (osStr.Contains("iPad"))
				{
					Current = Values.Tablet;
					break;
				}
				Current = Values.Phone;
			}
			break;
			default:	
				Current = Values.Desktop;
			break;
		}
		
		//WARN: dbg string
		Current = Values.Phone;
		
		Debug.Log(string.Format("Decided that we are on {0}", Current));
	}
}
