using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.Unity;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Configuration;
using ILS.Domain;

namespace ILS.Web.Extensions
{
	public static class ContextConfigurator
	{
		public static void Init(IUnityContainer container)
		{
			var connStr = ConfigurationManager.ConnectionStrings["default"].ConnectionString;
			Database.DefaultConnectionFactory = new SqlConnectionFactory(connStr);
			Database.SetInitializer<ILSContext>(new ILSContextInitializer());

			container.RegisterType<ILSContext>(new PerSessionLifetimeManager());
		}
	}
}