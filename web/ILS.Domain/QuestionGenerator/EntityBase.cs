using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain.QuestionGenerator
{
    public class EntityBase
    {
        [Key, Column(Order = 0)]
        public Guid Id { get; set; }

        public EntityBase()
        {
            Id = Guid.NewGuid();
        }
    }
}
