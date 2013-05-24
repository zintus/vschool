using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Тип задания
    /// </summary>
    public class TypeOfQuestion
    {
        /// <summary>
        /// Идентификатор типа вопроса (строковая константа)
        /// </summary>
        [Key, Column(Order = 0)]
        public string TypeOfQuestionIdentifier { get; set; }

        /// <summary>
        /// Описание типа задания (название типа)
        /// </summary>
        public string Description { get; set; }
    }
}
