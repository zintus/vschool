using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
	public class Question : EntityBase
	{
		public int OrderNumber { get; set; }
        public string Text { get; set; }
        public string PicQ { get; set; }
        public bool IfPictured { get; set; }
        public string PicA { get; set; }
        [ForeignKey("ThemeContent")] public Guid ThemeContent_Id { get; set; }

        public virtual ThemeContent ThemeContent { get; set; }
        public virtual ICollection<AnswerVariant> AnswerVariants { get; set; }

        public Question()
        {
            AnswerVariants = new List<AnswerVariant>();
        }
    }
}
