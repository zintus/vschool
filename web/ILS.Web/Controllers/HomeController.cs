﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ILS.Controllers
{
	public class HomeController : Controller
	{
		//[Authorize]
        public ActionResult Index()
		{
			ViewBag.Message = "Welcome to ASP.NET MVC!";
            
			return View();
		}
	}
}
