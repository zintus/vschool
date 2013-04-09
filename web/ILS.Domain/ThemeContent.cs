using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
	public abstract class ThemeContent : EntityBase
	{
        public int OrderNumber { get; set; }
        public string Name { get; set; }

        [ForeignKey("Theme")] public Guid Theme_Id { get; set; }

        public virtual Theme Theme { get; set; }
	}
}
