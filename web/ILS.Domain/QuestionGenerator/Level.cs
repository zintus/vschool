using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Уровень сложности задания
    /// </summary>
    public class Level : EntityBase
    {
        /// <summary>
        /// Название уровня сложности
        /// </summary>
        public string Description { get; set; }
    }
}