using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class ThemeContentLink : EntityBase
    {
        [ForeignKey("ParentThemeContent")] public Guid ParentThemeContent_Id { get; set; }
        [ForeignKey("LinkedThemeContent")] public Guid? LinkedThemeContent_Id { get; set; }

        
        public virtual ThemeContent ParentThemeContent { get; set; }
        public virtual ThemeContent LinkedThemeContent { get; set; }

        public virtual ICollection<PersonalThemeContentLink> PersonalThemeContentLinks { get; set; }

        public ThemeContentLink()
        {
            PersonalThemeContentLinks = new List<PersonalThemeContentLink>();
        }
    }
}
