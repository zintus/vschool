using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuestionGenerator
{
    public class GeneratorController
    {
        //System.Collections.Generic.Dictionary<String, String> parameters = new System.Collections.Generic.Dictionary<string, string>();
        //    parameters.Add("NumSys_Type1_CenterGenerateNumber", "128");
        //    parameters.Add("NumSys_Type1_RadiusGenerateNumber", "32");
        //    QuestionGenerator.GeneratedTask task = QuestionGenerator.GeneratorController
        //        .GetTask("NumeralSystems.NumSys_Type1", "MultiplyChoisesSingleCorrectAnswer", parameters);
        public static GeneratedTask GetTask(string className, string typeOfQuestionIdentifier, Dictionary<String, String> parameters)
        {
            try
            {
                return (GeneratedTask)Type.GetType("QuestionGenerator." + className, true)
                    .GetConstructor(new Type[] { typeof(GeneratedTask.TypeOfTask), typeof(Dictionary<string, string>) })
                    .Invoke(new object[] 
                    { 
                        (GeneratedTask.TypeOfTask)Enum.Parse(typeof(GeneratedTask.TypeOfTask), "FreeAnswer"),
                        parameters
                    });
            }
            catch (TypeLoadException)
            {
                return null;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }
    }
}
