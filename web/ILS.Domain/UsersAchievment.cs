using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain
{
    public class UsersAchievment : EntityBase
    {
        [ForeignKey("User")]public Guid User_Id { get; set; }
        [ForeignKey("Achievment")]public Guid? Achievment_Id { get; set; }
        
        public int Value { get; set; }

        public virtual User User { get; set; }

        public virtual Achievment Achievment { get; set; }
    }
}
