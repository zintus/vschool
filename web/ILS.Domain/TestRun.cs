using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class TestRun : EntityBase
    {
        public int Result { get; set; }
        [ForeignKey("ThemeRun")] public Guid ThemeRun_Id { get; set; }
        [ForeignKey("ThemeContent")] public Guid? ThemeContent_Id { get; set; }

        public virtual ThemeRun ThemeRun { get; set; }
        public virtual ThemeContent ThemeContent { get; set; }
        public virtual ICollection<QuestionRun> QuestionsRuns { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }

        public TestRun()
        {
            Answers = new List<Answer>();
            QuestionsRuns = new List<QuestionRun>();
        }
    }
}
