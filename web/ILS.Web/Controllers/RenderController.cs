using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ILS.Domain;
using ILS.Web.Extensions;
using System.Web.Script.Serialization;

namespace ILS.Web.Controllers
{
    //[Authorize]
    public class RenderController : Controller
    {
        ILSContext context;
		public RenderController(ILSContext context)
		{
			this.context = context;
		}

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UnityList()
        {
            return Json(new
            {
                coursesNames = context.Course.OrderBy(x => x.Name).Select(x => new
                {
                    id = x.Id,
                    name = x.Name
                })
            });
        }

        public ActionResult UnityData(Guid id)
        {
            var c = context.Course.Find(id);
            return Json(new { 
                name = c.Name,
                themes = c.Themes.OrderBy(x => x.OrderNumber).Select(x => new {
                    name = x.Name,
                    contents = x.ThemeContents.OrderBy(y => y.OrderNumber).Select(y => new {
                        id = y.Id,
                        name = y.Name,
                        type = y.Type,
                        paragraphs = y.Paragraphs.OrderBy(z => z.OrderNumber).Select(z => new {
                            orderNumber = z.OrderNumber,
                            header = z.Header,
                            text = z.Text,
                            pictures = z.Pictures.OrderBy(u => u.OrderNumber).Select(u => new {
                                path = u.Path
                            })
                        }),
                        questions = y.Questions.OrderBy(v => v.OrderNumber).Select(v => new {
                            text = v.Text,
                            picQ = v.PicQ,
                            if_pictured = v.IfPictured,
                            picA = v.PicA,
                            ans_count = v.AnswerVariants.Count,
                            answers = v.AnswerVariants.OrderBy(w => w.OrderNumber).Select(w => new
                            {
                                text = w.OrderNumber + ") " + w.Text
                            })
                        })
                    })
                })
            });
        }

        public ActionResult UnityRPG()
        {
            User u = null;
            bool ifGuest = !HttpContext.User.Identity.IsAuthenticated;
            if (!ifGuest) u = context.User.First(x => x.Name == HttpContext.User.Identity.Name);
            {
                return Json(new {
                    ifGuest = ifGuest,
                    username = (ifGuest) ? "" : u.Name,
                    EXP = (ifGuest) ? 0 : u.EXP,
                    facultyStands_Seen = (ifGuest) ? false : u.FacultyStands_Seen,                    facultyStands_Finish = (ifGuest) ? false : u.FacultyStands_Finish,                    historyStand_Seen = (ifGuest) ? false : u.HistoryStand_Seen,                    historyStand_Finish = (ifGuest) ? false : u.HistoryStand_Finish,                    scienceStand_Seen = (ifGuest) ? false : u.ScienceStand_Seen,                    scienceStand_Finish = (ifGuest) ? false : u.ScienceStand_Finish,                    staffStand_Seen = (ifGuest) ? false : u.StaffStand_Seen,                    staffStand_Finish = (ifGuest) ? false : u.StaffStand_Finish,
                    logotypeJump = (ifGuest) ? false : u.LogotypeJump,                    tableJump = (ifGuest) ? false : u.TableJump,                    terminalJump = (ifGuest) ? false : u.TerminalJump,                    ladderJump_First = (ifGuest) ? false : u.LadderJump_First,                    ladderJump_All = (ifGuest) ? false : u.LadderJump_All,                    letThereBeLight = (ifGuest) ? false : u.LetThereBeLight,                    plantJump_First = (ifGuest) ? false : u.PlantJump_First,                    plantJump_Second = (ifGuest) ? false : u.PlantJump_Second,                    barrelRoll = (ifGuest) ? false : u.BarrelRoll,                    firstVisitLecture = (ifGuest) ? false : u.FirstVisitLecture,                    firstVisitTest = (ifGuest) ? false : u.FirstVisitTest,                    teleportations = (ifGuest) ? 0 : u.Teleportations,                    paragraphsSeen = (ifGuest) ? 0 : u.ParagraphsSeen,                    testsFinished = (ifGuest) ? 0 : u.TestsFinished
                });
            }
        }

        public ActionResult UnityStat(Guid id)
        {
            var c = context.Course.Find(id);
            if (!HttpContext.User.Identity.IsAuthenticated)
            { //если юзер - гость, то передать "нулевую" статистику (он начнет с самого начала, и сохранять его прогресс мы в базе не будем)
                return Json(new {
                    mode = "guest",
                    name = c.Name,
                    progress = 0.0,
                    timeSpent = 0.0,
                    visited = false,
                    completeAll = false,
                    themesRuns = c.Themes.OrderBy(x => x.OrderNumber).Select(x => new {
                        id = "",
                        name = x.Name,
                        progress = 0.0,
                        testsComplete = 0,
                        testsOverall = x.ThemeContents.Count(v => v.Type == "test"),
                        timeSpent = 0.0,
                        allLectures = false,
                        allTests = false,
                        allTestsMax = false,
                        completeAll = false,
                        testsRuns = x.ThemeContents.OrderBy(y => y.OrderNumber).Where(y => y.Type == "test").Select(y => new {
                            answersMinimum = y.MinResult,
                            answersCorrect = 0,
                            answersOverall = y.Questions.Count
                        }),
                        lecturesRuns = x.ThemeContents.OrderBy(z => z.OrderNumber).Where(z => z.Type == "lecture").Select(z => new {
                            timeSpent = 0.0,
                            paragraphsRuns = z.Paragraphs.Select(u => new {
                                haveSeen = false
                            })
                        })
                    })
                });
            }
            else
            { //если юзер авторизован, то найти его в базе по имени
                var u = context.User.First(x => x.Name == HttpContext.User.Identity.Name);
                if (context.CourseRun.Count(x => (x.User.Name == u.Name) && (x.Course_Id == c.Id)) == 0) //ищем в базе статистику юзера по этому курсу
                { //если нет, то он заходит в него впервые, и надо создать ему "нулевую" статистику
                    CourseRun cr = new CourseRun() {
                        Course = c, User = u, Progress = 0.0, TimeSpent = 0.0, Visisted = false, CompleteAll = false
                    };
                    u.CoursesRuns.Add(cr);
                    foreach (var t in c.Themes.OrderBy(x => x.OrderNumber))
                    {
                        ThemeRun tr = new ThemeRun() {
                            Theme = t, CourseRun = cr, Progress = 0.0, TimeSpent = 0.0, TestsComplete = 0,
                            AllLectures = false, AllTests = false, AllTestsMax = false, CompleteAll = false
                        };
                        cr.ThemesRuns.Add(tr);
                        foreach (var tc in t.ThemeContents.OrderBy(x => x.OrderNumber).Where(x => x.Type == "lecture"))
                        {
                            LectureRun lr = new LectureRun() { ThemeContent = tc, ThemeRun = tr, TimeSpent = 0.0 };
                            tr.LecturesRuns.Add(lr);
                            foreach (var p in tc.Paragraphs.OrderBy(x => x.OrderNumber))
                            {
                                ParagraphRun pr = new ParagraphRun() { Paragraph = p, LectureRun = lr, HaveSeen = false };
                                lr.ParagraphsRuns.Add(pr);
                            }
                        }
                    }
                    context.SaveChanges();
                }
                var course_run = context.CourseRun.First(x => (x.User.Name == u.Name) && (x.Course_Id == c.Id));
                return Json(new
                { //возвращаем статистику юзера - неважно, "нулевая" ли она и только что созданная или же старая и в ней уже есть какой-то прогресс
                    mode = "registered",
                    id = course_run.Id,
                    name = c.Name,
                    progress = course_run.Progress,
                    timeSpent = course_run.TimeSpent,
                    visited = course_run.Visisted,
                    completeAll = course_run.CompleteAll,
                    themesRuns = course_run.ThemesRuns.OrderBy(x => x.Theme.OrderNumber).Select(x => new {
                        id = x.Id,
                        name = x.Theme.Name,
                        progress = x.Progress,
                        testsComplete = x.TestsComplete,
                        testsOverall = x.Theme.ThemeContents.Count(v => v.Type == "test"),
                        timeSpent = x.TimeSpent,
                        allLectures = x.AllLectures,
                        allTests = x.AllTests,
                        allTestsMax = x.AllTestsMax,
                        completeAll = x.CompleteAll,
                        testsRuns = x.Theme.ThemeContents.OrderBy(y => y.OrderNumber).Where(y => y.Type == "test").Select(y => new {
                            answersMinimum = y.MinResult,
                            answersCorrect = (x.TestsRuns.Count(w => w.ThemeContent == y) == 0) ? 0 : x.TestsRuns.Where(w => w.ThemeContent == y).OrderByDescending(w => w.Result).First().Result,
                            answersOverall = y.Questions.Count
                        }),
                        lecturesRuns = x.LecturesRuns.OrderBy(z => z.ThemeContent.OrderNumber).Select(z => new {
                            timeSpent = z.TimeSpent,
                            paragraphsRuns = z.ParagraphsRuns.OrderBy(q => q.Paragraph.OrderNumber).Select(q => new {
                                haveSeen = q.HaveSeen
                            })
                        })
                    })
                });

            }            
        }

        public int UnitySaveRPG(string s)
        {
            User u = context.User.First(x => x.Name == HttpContext.User.Identity.Name);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var obj = jss.Deserialize<dynamic>(s);

            u.EXP = obj["EXP"];
            u.FacultyStands_Seen = obj["facultyStands_Seen"]; u.FacultyStands_Finish = obj["facultyStands_Finish"];
            u.HistoryStand_Seen = obj["historyStand_Seen"]; u.HistoryStand_Finish = obj["historyStand_Finish"];
            u.ScienceStand_Seen = obj["scienceStand_Seen"]; u.ScienceStand_Finish = obj["scienceStand_Finish"];
            u.StaffStand_Seen = obj["staffStand_Seen"]; u.StaffStand_Finish = obj["staffStand_Finish"];
            u.LogotypeJump = obj["logotypeJump"]; u.TableJump = obj["tableJump"]; u.TerminalJump = obj["terminalJump"];
            u.LadderJump_First = obj["ladderJump_First"]; u.LadderJump_All = obj["ladderJump_All"]; u.LetThereBeLight = obj["letThereBeLight"];
            u.PlantJump_First = obj["plantJump_First"]; u.PlantJump_Second = obj["plantJump_Second"]; u.BarrelRoll = obj["barrelRoll"];
            u.FirstVisitLecture = obj["firstVisitLecture"]; u.FirstVisitTest = obj["firstVisitTest"];
            u.Teleportations = obj["teleportations"]; u.ParagraphsSeen = obj["paragraphsSeen"]; u.TestsFinished = obj["testsFinished"];

            context.SaveChanges();
            return 1;
        }

        public int UnitySave(string s)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var obj = jss.Deserialize<dynamic>(s);
            CourseRun course_run = context.CourseRun.Find(Guid.Parse(obj["id"]));
            course_run.Progress = (double) obj["progress"];
            course_run.TimeSpent = (double) obj["timeSpent"];
            course_run.Visisted = obj["visited"];
            course_run.CompleteAll = obj["completeAll"];
            int i = 0;
            foreach (ThemeRun theme_run in course_run.ThemesRuns.OrderBy(x => x.Theme.OrderNumber))
            {
                theme_run.Progress = (double) obj["themesRuns"][i]["progress"];
                theme_run.TimeSpent = (double) obj["themesRuns"][i]["timeSpent"];
                theme_run.TestsComplete = obj["themesRuns"][i]["testsComplete"];
                theme_run.AllLectures = obj["themesRuns"][i]["allLectures"];
                theme_run.AllTests = obj["themesRuns"][i]["allTests"];
                theme_run.AllTestsMax = obj["themesRuns"][i]["allTestsMax"];
                theme_run.CompleteAll = obj["themesRuns"][i]["completeAll"];
                int j = 0;
                foreach (LectureRun lec_run in theme_run.LecturesRuns.OrderBy(y => y.ThemeContent.OrderNumber)) 
                {
                    lec_run.TimeSpent = (double) obj["themesRuns"][i]["lecturesRuns"][j]["timeSpent"];
                    int k = 0;
                    foreach (ParagraphRun p_run in lec_run.ParagraphsRuns.OrderBy(z => z.Paragraph.OrderNumber))
                    {
                        p_run.HaveSeen = obj["themesRuns"][i]["lecturesRuns"][j]["paragraphsRuns"][k]["haveSeen"];
                        k++;
                    }
                    j++;
                }
                i++;
            }
            context.SaveChanges();
            return 1;
        }

        public int UnityTest(string mode, Guid? theme_run_id, Guid test_id)
        {
            var s = HttpContext.Request.Params["answers"];
            string[] f = HttpContext.Request.Params["time"].Split(',');

            if (mode != "guest")
            {
                TestRun TR = new TestRun { Result = 0 };
                ThemeRun theme_run = context.ThemeRun.Find(theme_run_id);
                ThemeContent test = context.ThemeContent.Find(test_id);
                theme_run.TestsRuns.Add(TR); test.TestRuns.Add(TR);

                int i = 0; bool correct = true;
                foreach (var q in test.Questions.OrderBy(x => x.OrderNumber))
                {
                    correct = true;
                    TR.QuestionsRuns.Add(new QuestionRun { Question = q, TimeSpent = Convert.ToDouble(f[q.OrderNumber - 1], System.Globalization.CultureInfo.InvariantCulture) });
                    foreach (var a in q.AnswerVariants.OrderBy(x => x.OrderNumber))
                    {
                        if (s[i] == '1') TR.Answers.Add(new Answer { AnswerVariant = a });
                        if (((s[i] == '1') && !a.IfCorrect) || ((s[i] == '0') && a.IfCorrect)) correct = false;
                        i += 2;
                    }
                    if (correct) TR.Result++;
                }

                context.SaveChanges();
                return TR.Result;
            }
            else
            {
                ThemeContent test = context.ThemeContent.Find(test_id);
                int res = 0; int i = 0; bool correct = true;
                foreach (var q in test.Questions.OrderBy(x => x.OrderNumber))
                {
                    correct = true;                    
                    foreach (var a in q.AnswerVariants.OrderBy(x => x.OrderNumber))
                    {                        
                        if (((s[i] == '1') && !a.IfCorrect) || ((s[i] == '0') && a.IfCorrect)) correct = false;
                        i += 2;
                    }
                    if (correct) res++;
                }                
                return res;
            }

        }
    }
}