using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain
{
    public class ParagraphRun : EntityBase
    {
        public bool HaveSeen { get; set; }
        [ForeignKey("LectureRun")] public Guid LectureRun_Id { get; set; }
        [ForeignKey("Paragraph")] public Guid? Paragraph_Id { get; set; }

        public virtual LectureRun LectureRun { get; set; }
        public virtual Paragraph Paragraph { get; set; }

    }
}
