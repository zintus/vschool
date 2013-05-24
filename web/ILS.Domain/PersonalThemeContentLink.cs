using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain
{
    public class PersonalThemeContentLink : EntityBase
    {
        public string Status { get; set; }

        [ForeignKey("ThemeContentLink")] public Guid ThemeContentLink_Id { get; set; }
        [ForeignKey("ThemeRun")] public Guid? ThemeRun_Id { get; set; }

        public virtual ThemeContentLink ThemeContentLink { get; set; }
        public virtual ThemeRun ThemeRun { get; set; }
    }
}