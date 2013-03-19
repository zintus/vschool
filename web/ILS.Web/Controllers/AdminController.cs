using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ILS.Domain;

namespace ILS.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
		ILSContext context;
		public AdminController(ILSContext context)
		{
			this.context = context;
		}

        public ActionResult Index()
        {
			return View();
        }
    }
}
