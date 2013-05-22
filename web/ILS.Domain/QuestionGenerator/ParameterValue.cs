using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Значение параметра
    /// </summary>
    public class ParameterValue : EntityBase
    {
        [Key, ForeignKey("Parameter"), Column(Order = 1)]
        public string ParameterIdentifier { get; set; }

        [Key, ForeignKey("Level"), Column(Order = 2)]
        public Guid Level_Id { get; set; }

        /// <summary>
        /// Значение параметра
        /// </summary>
        public string Value { get; set; }

        public virtual Parameter Parameter { get; set; }
        public virtual Level Level { get; set; }
    }
}