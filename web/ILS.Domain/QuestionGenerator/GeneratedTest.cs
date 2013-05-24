using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using ILS.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Тест, объединяющий генерируемые задания
    /// </summary>
    public class GeneratedTest : EntityBase
    {
        /// <summary>
        /// Параграф, которому соответствует тест
        /// </summary>
        [ForeignKey("Paragraph")]
        public Guid Paragraph_Id { get; set; }

        public virtual Paragraph Paragraph { get; set; }
    }
}
