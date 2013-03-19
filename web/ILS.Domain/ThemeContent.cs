using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
	public class ThemeContent : EntityBase
	{
        public int OrderNumber { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int MinResult { get; set; }
        [ForeignKey("Theme")] public Guid Theme_Id { get; set; }

        public virtual Theme Theme { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<Paragraph> Paragraphs { get; set; }
        public virtual ICollection<TestRun> TestRuns { get; set; }

        public ThemeContent()
        {
            Questions = new List<Question>();
            Paragraphs = new List<Paragraph>();
            TestRuns = new List<TestRun>();
        }
	}
}
