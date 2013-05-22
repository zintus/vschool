using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuestionGenerator
{
    public abstract class GeneratedTask
    {
        public enum TypeOfTask
        {
            /// <summary>
            /// Несколько вариантов ответов - 1 верный
            /// (часть А ЕГЭ)
            /// </summary>
            MultiplyChoisesSingleCorrectAnswer,
            /// <summary>
            /// Свой ответ
            /// (часть В ЕГЭ)
            /// </summary>
            FreeAnswer
        }

        protected List<string> answers = new List<string>();
        protected int indexOfCorrectAnswer;
        protected TypeOfTask type;
        protected Dictionary<String, String> parameters = null;

        public GeneratedTask(TypeOfTask type, Dictionary<String, String> parameters)
        {
            this.type = type;
            this.parameters = parameters;
        }

        public string Question
        {
            get;
            protected set;
        }
        /*
         
        public const int COUNT_OF_ANSWERS_IN_MULTYPLY_CHOISES_SINGLE_CORRECT_TASK_TYPE = 4;
        
        public List<string> GetAnswers()
        {
            if (type == TaskType.MultiplyChoisesSingleCorrectAnswer)
                return answers;
            return null;
        }

        public bool CheckAnswer(string answer)
        {
            switch (type)
            {
                case TaskType.MultiplyChoisesSingleCorrectAnswer:
                    int value;
                    if (Int32.TryParse(answer, out value))
                        return (value == indexOfCorrectAnswer);
                    else return false;
                case TaskType.FreeAnswer:
                    return (answer.Trim().ToLower().Equals(this.answers[0]));
                default:
                    throw new IncompatibleTaskTypeException();
            }
        }*/
    }
}
