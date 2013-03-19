using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class LectureRun : EntityBase
    {
        public double TimeSpent { get; set; }
        [ForeignKey("ThemeRun")] public Guid ThemeRun_Id { get; set; }
        [ForeignKey("ThemeContent")] public Guid? ThemeContent_Id { get; set; }

        public virtual ThemeRun ThemeRun { get; set; }
        public virtual ThemeContent ThemeContent { get; set; }
        public virtual ICollection<ParagraphRun> ParagraphsRuns { get; set; }

        public LectureRun()
        {
            ParagraphsRuns = new List<ParagraphRun>();
        }
    }
}
