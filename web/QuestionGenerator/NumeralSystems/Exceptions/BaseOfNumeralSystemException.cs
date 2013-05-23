using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuestionGenerator.NumeralSystems.Exceptions
{
    class BaseOfNumeralSystemException : Exception
    {
        public BaseOfNumeralSystemException()
            : base("Неверное основание системы счисления! Основание системы счисления " +
            "должно находиться в пределах от 2 до 16") { }
    }
}
