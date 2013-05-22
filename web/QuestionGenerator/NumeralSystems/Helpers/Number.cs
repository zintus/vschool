using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using QuestionGenerator.NumeralSystems.Exceptions;

namespace QuestionGenerator.NumeralSystems.Helpers
{
    public class Number : IComparable
    {
        private int decNumber;

        public Number(int decNumber)
        {
            this.decNumber = decNumber;
        }

        public static Number operator +(Number n1, Number n2)
        {
            return new Number(n1.decNumber + n2.decNumber);
        }

        public static Number operator -(Number n1, Number n2)
        {
            return new Number(n1.decNumber - n2.decNumber);
        }

        public static Number operator *(Number n1, Number n2)
        {
            return new Number(n1.decNumber * n2.decNumber);
        }

        public int GetDecValue()
        {
            return this.decNumber;
        }

        public static string ToBinaryString(int value)
        {
            return (new Number(value)).ToString(2);
        }

        public string ToString(int baseOfNumeralSystem)
        {
            int decValue = this.decNumber;

            if (baseOfNumeralSystem < 2 || baseOfNumeralSystem > 16)
                throw new BaseOfNumeralSystemException();

            StringBuilder sb = new StringBuilder();

            while (decValue >= baseOfNumeralSystem)
            {
                sb.Append(System.Convert.ToString(decValue % baseOfNumeralSystem, 16), 0, 1);
                decValue /= baseOfNumeralSystem;
            }
            sb.Append(System.Convert.ToString(decValue % baseOfNumeralSystem, 16), 0, 1);

            return new String(sb.ToString().ToUpper().ToCharArray().Reverse().ToArray<Char>());
        }

        public int CompareTo(object obj)
        {
            if (obj == null) return 1;

            Number otherNumber = obj as Number;
            if (otherNumber != null)
                return this.decNumber.CompareTo(otherNumber.decNumber);
            else
                throw new ArgumentException("Object is not a Number");
        }
    }
}
