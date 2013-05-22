using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Ограничение, накладываемое на параметр
    /// </summary>
    public class Constraint
    {
        [Key, ForeignKey("Parameter"), Column(Order = 0)]
        public string ParameterIdentifier { get; set; }

        /// <summary>
        /// Тип ограничения (строковая константа)
        /// </summary>
        [Key, Column(Order = 1)]
        public string TypeOfConstraint { get; set; }

        /// <summary>
        /// Числовое значение ограничения
        /// </summary>
        [Key, Column(Order = 2)]
        public int Value { get; set; }


        public virtual Parameter Parameter { get; set; }
    }
}
