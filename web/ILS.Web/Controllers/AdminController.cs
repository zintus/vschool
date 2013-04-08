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
        List<UserModel> contact;

		ILSContext context;
		public AdminController(ILSContext context)
		{
			this.context = context;
            contact = new List<UserModel> {
                new UserModel("Name", true, "Mail"),
                new UserModel("Name2", true, "Mail2"),
                new UserModel("Name3", false, "Mail3")
            };
		}

        public ActionResult Index()
        {
			return View();
        }

        public JsonResult ReadUser()
        {
            JsonResult jr =  (JsonResult)UsersList();
            
            return jr;
        }



        [HttpPost]
        public JsonResult CreateUser(List<UserModel> data)
        {
            
            contact = data;
            return Json(new
            {
                contact
            }, JsonRequestBehavior.AllowGet);
  
        }

        [HttpPost]
        public JsonResult UpdateUser(List<UserModel> data)
        {
            contact = data;
            return Json(new
            {
                contact
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteUser(List<UserModel> data)
        {
            contact = data;
            return Json(new
            {
                contact
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UsersList()
        {
            
            var query = from user in context.User
                        select new
                        {
                            Name = user.Name,
                            Email = user.Email,
                            IsApproved = user.IsApproved
                        };
            
            JsonResult jr = new JsonResult();
            
            jr.Data = query;
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return jr;
        }
    }
}
