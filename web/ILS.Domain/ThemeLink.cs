using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class ThemeLink : EntityBase
    {
        [ForeignKey("ParentTheme")] public Guid ParentTheme_Id { get; set; }
        [ForeignKey("LinkedTheme")] public Guid? LinkedTheme_Id { get; set; }

        
        public virtual Theme ParentTheme { get; set; }
        public virtual Theme LinkedTheme { get; set; }

        public virtual ICollection<PersonalThemeLink> PersonalThemeLinks { get; set; }

        public ThemeLink()
        {
            PersonalThemeLinks = new List<PersonalThemeLink>();
        }
    }
}
