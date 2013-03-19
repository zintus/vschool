using UnityEngine;
using System.Collections;
using System;

public class DefaultSkin : object, IDisposable
{	
	public static float LayoutScale
	{
		get
		{
			switch(InterfaceIdiom.Current) 
			{
				case InterfaceIdiom.Values.Phone:
					return .2f;
				case InterfaceIdiom.Values.Desktop:
				case InterfaceIdiom.Values.Tablet:
					return .1f;
			}
			
			return 0.1f;
		}
	}
	
    Font old_font_bx;
	Font old_font_bt;
    int old_fontSize_bx;
	int old_fontSize_bt;
    FontStyle old_fontStyle_bx;
	FontStyle old_fontStyle_bt;
    Color old_textColor_bx;
	Color old_textColor_bt;
	
	public DefaultSkin()
	{
		old_font_bx = GUI.skin.box.font; 
		old_font_bt = GUI.skin.button.font;
        old_fontSize_bx = GUI.skin.box.fontSize; 
		old_fontSize_bt = GUI.skin.button.fontSize;
        old_fontStyle_bx = GUI.skin.box.fontStyle; 
		old_fontStyle_bt = GUI.skin.button.fontStyle;
        old_textColor_bx = GUI.skin.box.normal.textColor; 
		old_textColor_bt = GUI.skin.button.normal.textColor;
		
		var font = Resources.Load("HelveticaWorld-Regular") as Font;
		
		switch(InterfaceIdiom.Current)
		{
			case (InterfaceIdiom.Values.Phone):
			{
				GUI.skin.box.font = font; 
				GUI.skin.button.font = font;
				GUI.skin.box.fontSize = 20; 
				GUI.skin.button.fontSize = 20;
				GUI.skin.box.fontStyle = FontStyle.Bold; 
				GUI.skin.button.fontStyle = FontStyle.Bold;
				GUI.skin.box.normal.textColor = Color.white; 
				GUI.skin.button.normal.textColor = Color.white;
			} break;
			case(InterfaceIdiom.Values.Desktop):
			{
				GUI.skin.box.font = font; 
				GUI.skin.button.font = font;
				GUI.skin.box.fontSize = 14; 
				GUI.skin.button.fontSize = 14;
				GUI.skin.box.fontStyle = FontStyle.Bold; 
				GUI.skin.button.fontStyle = FontStyle.Bold;
				GUI.skin.box.normal.textColor = Color.white; 
				GUI.skin.button.normal.textColor = Color.white;
			} break;
			default:
				break;
		}
	}
	
	public void Dispose()
	{
		GUI.skin.box.font = old_font_bx;
		GUI.skin.button.font = old_font_bt;
        GUI.skin.box.fontSize = old_fontSize_bx;
		GUI.skin.button.fontSize = old_fontSize_bt;
        GUI.skin.box.fontStyle = old_fontStyle_bx;
		GUI.skin.button.fontStyle = old_fontStyle_bt;
        GUI.skin.box.normal.textColor = old_textColor_bx;
		GUI.skin.button.normal.textColor = old_textColor_bt;
	}
}
