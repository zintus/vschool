using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class Paragraph : EntityBase
    {
        public int OrderNumber { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        [ForeignKey("ThemeContent")] public Guid ThemeContent_Id { get; set; }

        public virtual ThemeContent ThemeContent { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }

        public Paragraph()
        {
            Pictures = new List<Picture>();
        }
    }
}
