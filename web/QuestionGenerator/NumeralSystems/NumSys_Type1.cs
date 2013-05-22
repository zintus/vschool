using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using QuestionGenerator.NumeralSystems.Helpers;

namespace QuestionGenerator.NumeralSystems
{
    /// <summary>
    /// Сколько единиц в двоичной записи десятичного числа 127?
    ///     1) 1
    ///     2) 2
    ///     3) 6
    ///     4) 7
    /// </summary>
    class NumSys_Type1 : GeneratedTask
    {
        private static Random rg = new Random();
        private Number n;
        private enum Digit { Zero, One };

        public NumSys_Type1(TypeOfTask type, Dictionary<String, String> parameters)
            : base(type, parameters)
        { }



        //// int center, int radius
        //public NumSys_Type1(int center, int radius)
        //    : this(center, radius, COUNT_OF_ANSWERS_IN_MULTYPLY_CHOISES_SINGLE_CORRECT_TASK_TYPE)
        //{
        //    n = new Number(center - radius + rg.Next(radius) + rg.Next(radius));
        //    Digit digit = (rg.Next(2) == 0) ? Digit.One : Digit.Zero;

        //    this.Question = String.Format("Сколько {0} в двоичной записи десятичного числа {1}?",
        //        (digit == Digit.One) ? "единиц" : "значащих нулей", n.GetDecValue());

        //    int index;

        //    this.answers = GenerateAnswers(n, digit, out index);

        //    this.indexOfCorrectAnswer = index;
        //}

        //public NumSys_Type1(TaskType type, int center, int radius, int countOfAnswers)
        //    : base(type, param, countOfAnswers)
        //{ }

        //private string[] GenerateAnswers(Number n, Digit digit, out int indexOfCorrectAnswer)
        //{
        //    string[] retVal = new string[COUNT_OF_ANSWERS];

        //    string number = n.ToString(2);

        //    int count0 = 0, count1 = 0;
        //    for (int i = 0; i < number.Length; i++)
        //    {
        //        switch (number[i])
        //        {
        //            case '0': count0++; break;
        //            case '1': count1++; break;
        //        }
        //    }

        //    int correctAnswer = (digit == Digit.Zero) ? count0 : count1;
        //    int startAnswer = correctAnswer - rg.Next(4);

        //    if (startAnswer < 1) startAnswer = 1;

        //    indexOfCorrectAnswer = 0;
        //    for (int i = 0; i < COUNT_OF_ANSWERS; i++)
        //    {
        //        retVal[i] = "" + (startAnswer + i);
        //        if (startAnswer + i == correctAnswer)
        //        {
        //            indexOfCorrectAnswer = i;
        //        }
        //    }

        //    return retVal;
        //}
    }
}
