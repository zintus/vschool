using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Экземпляр генерируемого задания (объект, связывающий параметры 
    /// генерируемого задания), который может быть использован для генерации
    /// типового задания
    /// </summary>
    public class InstanceOfQuestion : EntityBase
    {
        [ForeignKey("QuestionTemplate")]
        public Guid QuestionTemplate_Id { get; set; }

        [ForeignKey("TypeOfQuestion")]
        public string TypeOfQuestionIdentifier { get; set; }

        [ForeignKey("Level")]
        public Guid Level_Id { get; set; }

        public virtual QuestionTemplate QuestionTemplate { get; set; }
        public virtual TypeOfQuestion TypeOfQuestion { get; set; }
        public virtual Level Level { get; set; }
    }
}