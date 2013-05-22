using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Шаблон задания
    /// </summary>
    public class QuestionTemplate : EntityBase
    {
        /// <summary>
        /// Описание типового задания
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Название класса задачи
        /// </summary>
        public string ClassName { get; set; }
    }
}