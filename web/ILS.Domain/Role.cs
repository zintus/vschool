using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
	public class Role : EntityBase
	{
		public string Name { get; set; }

        public ICollection<User> Users { get; set; }

        public Role()
        {
            Users = new HashSet<User>();
        }
	}
}
