using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using ILS.Domain;

namespace ILS.Domain.QuestionGenerator
{
    /// <summary>
    /// Содержимое генерируемого теста
    /// </summary>
    public class TestContent : EntityBase
    {
        /// <summary>
        /// Порядковый номер задания в тесте
        /// </summary>
        public int OrderNumber { get; set; }

        [ForeignKey("GeneratedTest")]
        public Guid GeneratedTest_Id { get; set; }

        [ForeignKey("InstanceOfQuestion")]
        public Guid InstanceOfQuestion_Id { get; set; }

        public virtual GeneratedTest GeneratedTest { get; set; }
        public virtual InstanceOfQuestion InstanceOfQuestion { get; set; }
    }
}
