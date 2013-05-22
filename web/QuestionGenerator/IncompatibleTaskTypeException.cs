using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuestionGenerator
{
    class IncompatibleTaskTypeException : Exception
    {
        public IncompatibleTaskTypeException()
            : base("Данный тип задания не поддерживается") { }
    }
}
