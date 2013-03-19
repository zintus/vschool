using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
	public class EntityBase
	{
		[Key]
		public Guid Id { get; set; }

		public EntityBase()
		{
			Id = Guid.NewGuid();
		}
	}
}
