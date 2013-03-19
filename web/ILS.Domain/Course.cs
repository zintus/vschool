using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ILS.Domain
{
	public class Course : EntityBase
	{
		public string Name { get; set; }        
		public string Diagramm { get; set; }
        public virtual ICollection<Theme> Themes { get; set; }

		public Course()
		{
			Themes = new List<Theme>();
		}
	}
}
