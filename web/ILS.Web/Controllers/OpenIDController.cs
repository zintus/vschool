using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using ILS.Domain;
using ILS.Models;

namespace ILS.Web.Controllers
{
    public class OpenIDController : Controller
    {


		ILSContext context;
		public OpenIDController(ILSContext context)
		{
			this.context = context;

		}

        public IFormsAuthenticationService FormsService { get; set; }
        public IMembershipService MembershipService { get; set; }

        protected override void Initialize(RequestContext requestContext)
        {
            if (FormsService == null) { FormsService = new FormsAuthenticationService(); }
            if (MembershipService == null) { MembershipService = new AccountMembershipService(); }

            base.Initialize(requestContext);
        }


        [HttpGet]
        public ActionResult Index()
        {
			return View();
        }


        [HttpPost]
        public ActionResult Index(List<OpenIDModel> data)
        {
            String login = data[0].Login;
            int count = context.User.Count(x => x.Name == login);
            if (count > 0)
            {
                FormsService.SignIn(login, false);
                return View();
            } 
            context.User.Add(new User()
            {
                Name = data[0].Login,
                FirstName = data[0].FirstName,
                LastName = data[0].LastName,
                Email = data[0].Email
            });
            context.SaveChanges();
            return Json(new { success = true });
        }

    }
}
