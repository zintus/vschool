/*значиццо, в чем идея
данный скрипт - это пресловутый "конструктор курсов" (а точнее, его Юнити-часть)

чуть ниже мы видим переменные-ссылки на все основные типы комнат
эти комнаты (те самые, что сейчас видно в редакторе на сцене) до конца скрипта не доживут
они будут шаблонами, которые конструктор скопирует нужное количество раз, а затем удалит
для этого они помечены тегом Template

еще чуть ниже мы наблюдаем длинную строку JSONStringFromServer
по структуре это полный аналог той строчки, которую бы прислал наш VisualStudio-проект через браузер
в нее входит вся информация о курсе: темы, лекции и тесты каждой темы, вопросы каждого теста и т.д.
мы будем парсить ее во внутренние классы, описанные в соседнем скрипте DataStructures.js
эти классы повторяют таблицы базы данных
фактически, после парсинга мы получаем на руки кусочек базы данных, и дальше с ним работаем

это кусочек базы - дерево: корнем служит Course, у него есть коллекция тем Themes,
у тем есть коллекции содержимых, которые оказываются либо лекциями (type = "lecture"),
либо тестами (type = "test"), у лекций есть коллекция параграфов, а у тестов - коллекция вопросов

перемещаться по комнатам мы тоже будем как по дереву: из холла выходим в коридор курса, выбираем тему,
попадаем в ее коридор, выбираем содержимое и уже уходим в него

коридоры имеют переменную длину (в зависимости от количества тем / содержимых), поэтому собираются из кусочков
начало и конец всегда одни, а вот середина повторяется столько раз, сколько будок нам надо
состыковаются кусочки с помощью таких маленьких кубиков под названиями Anchor_Prev и Anchor_Next
они расположены так, что если два кусочка состыкованы верно, то оба соответствующих куба находятся в одном месте
поэтому алгоритм только совмещает кубы
кубы помечены тегами Anchor и по завершении работы конструктора скрываются

и последний общий момент - расположение накопированных комнат в пространстве
они размещаются друг над другом, комнаты каждого типа в своей "кучке", все выше и выше
запустите сцену, нажмите на U и поглядите сами*/

#pragma strict

import System.Collections.Generic;
//import DataStructures;

var MainCorridorStart : GameObject;
var MainCorridorMiddle : GameObject;
var MainCorridorEnd : GameObject;

var ThemeCorridorStart : GameObject;
var ThemeCorridorMiddle : GameObject;
var ThemeCorridorEnd : GameObject;

var LectureRoom : GameObject;
var QuizRoomA : GameObject;

var JSONTestString = 
	"{"+
		"\"name\":\"Информатика\","+
		"\"themes\":["+
			"{\"name\":\"Системы счисления\",\"contents\":["+
				"{\"id\":\"11111111-1111-0000-0000-000000000000\",\"name\":\"Лекционный материал\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"11111111-2222-0000-0000-000000000000\",\"name\":\"Тестовые задания - часть А\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]}"+
			"]},"+
			"{\"name\":\"Типы данных\",\"contents\":["+
				"{\"id\":\"22222222-1111-0000-0000-000000000000\",\"name\":\"Повествовательная часть №1\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"22222222-2222-0000-0000-000000000000\",\"name\":\"Повествовательная часть №2\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"22222222-3333-0000-0000-000000000000\",\"name\":\"Тесты с вариантами ответа\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"22222222-4444-0000-0000-000000000000\",\"name\":\"Тесты без вариантов ответа\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]}"+
			"]},"+
			"{\"name\":\"Алгоритмы\",\"contents\":["+
				"{\"id\":\"33333333-1111-0000-0000-000000000000\",\"name\":\"Храм знаний\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"33333333-2222-0000-0000-000000000000\",\"name\":\"Дом суровых испытаний\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]}"+
			"]},"+
			"{\"name\":\"Языки программирования\",\"contents\":["+
				"{\"id\":\"44444444-1111-0000-0000-000000000000\",\"name\":\"Двигающиеся стенды 1\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-2222-0000-0000-000000000000\",\"name\":\"Двигающиеся стенды 2\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-3333-0000-0000-000000000000\",\"name\":\"Двигающиеся стенды 3\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-4444-0000-0000-000000000000\",\"name\":\"Летающие кубики 1\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-5555-0000-0000-000000000000\",\"name\":\"Летающие кубики 2\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-6666-0000-0000-000000000000\",\"name\":\"Летающие кубики 3\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]},"+
				"{\"id\":\"44444444-7777-0000-0000-000000000000\",\"name\":\"Летающие кубики 4\",\"type\":\"test\",\"questions\":[],\"paragraphs\":[]}"+
			"]},"+
			"{\"name\":\"Подготовка к ЕГЭ\",\"contents\":["+
				"{\"id\":\"55555555-1111-0000-0000-000000000000\",\"name\":\"Лекционный материал (1)\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":["+
					"{\"orderNumber\":1,\"header\":\"1.1 Системы счисления\",\"text\":\"Система счисления — символический метод записи чисел, представление чисел с помощью письменных знаков. Cистема счисления дает представления множества чисел (целых и/или вещественных), дает каждому числу уникальное представление (или, по крайней мере, стандартное представление), отражает алгебраическую и арифметическую структуру чисел. Системы счисления подразделяются на позиционные, непозиционные и смешанные. Чем больше основание системы счисления, тем меньшее количество разрядов (то есть записываемых цифр) требуется при записи числа в позиционных системах счисления.\",\"pictures\":[]},"+
					"{\"orderNumber\":2,\"header\":\"1.2 Кодирование информации\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 1.2\",\"pictures\":[]},"+
					"{\"orderNumber\":3,\"header\":\"1.3 Структуры данных\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 1.3\",\"pictures\":[]},"+
					"{\"orderNumber\":4,\"header\":\"2.1 Понятие алгоритма\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 2.1\",\"pictures\":[]},"+
					"{\"orderNumber\":5,\"header\":\"2.2 Построение блок-схем\",\"text\":\"Схема — графическое представление определения, анализа или метода решения задачи, в котором используются символы для отображения операций, данных, потока, оборудования и т. д. Блок-схема — распространенный тип схем, описывающих алгоритмы или процессы, в которых отдельные шаги изображаются в виде блоков различной формы, соединенных между собой линиями.\",\"pictures\":[]},"+
					"{\"orderNumber\":6,\"header\":\"2.3 Языки программирования\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 2.3\",\"pictures\":[]},"+
					"{\"orderNumber\":7,\"header\":\"3.1 Логические выражения\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 3.1\",\"pictures\":[]},"+
					"{\"orderNumber\":8,\"header\":\"3.2 Таблицы истинности\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 3.2\",\"pictures\":[]},"+
					"{\"orderNumber\":9,\"header\":\"3.3 Введение в ИИ\",\"text\":\"Искусственный интеллект - наука и технология создания интеллектуальных машин, особенно интеллектуальных компьютерных программ. ИИ связан со сходной задачей использования компьютеров для понимания человеческого интеллекта, но не обязательно ограничивается биологически правдоподобными методами.\",\"pictures\":[]},"+
					"{\"orderNumber\":10,\"header\":\"4.1 Компьютерная графика\",\"text\":\"Недаром говорят: лучше один раз увидеть, чем сто раз услышать. Исследования подтверждают, что информационная пропускная способность органов зрения значительно выше, чем у других каналов передачи информации, доступных человеку. В теории информации доказано, что, подбрасывая монету и наблюдая результат, мы всякий раз получаем одну двоичную единицу (бит) информации. Каждая буква в тексте несет примерно 4 бита информации. Изображение участка поверхности Земли, полученное из космоса, содержит примерно 10 миллионов бит информации! Переработать такое количество информации под силу только самому современному компьютеру. Чтобы научить машину обрабатывать изображения, требуется иметь мощный комплекс технических средств, математический аппарат, алгоритмы и большое количество программ.\",\"pictures\":["+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-01.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-02.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-03.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-04.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-05.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-06.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-07.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-08.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-09.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-10.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-11.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-12.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-13.jpg\"},"+
						"{\"path\":\"file://E:/Assembla Repository/trunk/ILS.Web/Content/pics_test/ege-lec-14.jpg\"}"+
					"]},"+
					"{\"orderNumber\":11,\"header\":\"4.2 Обработка изображений\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 4.2\",\"pictures\":[]},"+
					"{\"orderNumber\":12,\"header\":\"4.3 Обзор графических редакторов\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 4.3\",\"pictures\":[]},"+
					"{\"orderNumber\":13,\"header\":\"5.1 Электронные таблицы\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 5.1\",\"pictures\":[]},"+
					"{\"orderNumber\":14,\"header\":\"5.2 Основные типы диаграмм\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 5.2\",\"pictures\":[]},"+
					"{\"orderNumber\":15,\"header\":\"5.3 Работа с формулами в MS Excel\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 5.3\",\"pictures\":[]},"+
					"{\"orderNumber\":16,\"header\":\"6.1 Архитектура ЭВМ\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 6.1\",\"pictures\":[]},"+
					"{\"orderNumber\":17,\"header\":\"6.2 Центральный процессор\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 6.2\",\"pictures\":[]},"+
					"{\"orderNumber\":18,\"header\":\"6.3 Основная память\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 6.3\",\"pictures\":[]},"+
					"{\"orderNumber\":19,\"header\":\"7.1 Алгоритмы обработки данных - часть 1\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 7.1\",\"pictures\":[]},"+
					"{\"orderNumber\":20,\"header\":\"7.2 Алгоритмы обработки данных - часть 2\",\"text\":\"Тут следует дико длинная строчка, вместившая в себе весь параграф 7.2\",\"pictures\":[]}"+
				"]},"+
				"{\"id\":\"55555555-2222-0000-0000-000000000000\",\"name\":\"Лекционный материал (2)\",\"type\":\"lecture\",\"questions\":[],\"paragraphs\":["+
					"{\"orderNumber\":1,\"header\":\"Параграф 1\",\"text\":\"Текст параграфа 1\",\"pictures\":[]},"+
					"{\"orderNumber\":2,\"header\":\"Параграф 2\",\"text\":\"Текст параграфа 2\",\"pictures\":[]},"+
					"{\"orderNumber\":3,\"header\":\"Параграф 3\",\"text\":\"Текст параграфа 3\",\"pictures\":[]},"+
					"{\"orderNumber\":4,\"header\":\"Параграф 4\",\"text\":\"Текст параграфа 4\",\"pictures\":[]},"+
					"{\"orderNumber\":5,\"header\":\"Параграф 5\",\"text\":\"Текст параграфа 5\",\"pictures\":[]}"+
				"]},"+
				"{\"id\":\"55555555-3333-0000-0000-000000000000\",\"name\":\"Тестовые задания А (1)\",\"type\":\"test\",\"questions\":["+
					"{"+
						"\"text\":\"Даны числа A и B, записанные в разных системах счисления: А = 9D (16-ричная система), B = 237 (8-ричная система). Какое из чисел С, записанных в двоичной системе, отвечает условию A<C<B?\","+
						"\"picQ\":null,"+
						"\"if_pictured\":false,"+
						"\"picA\":null,"+
						"\"ans_count\":3,"+
						"\"answers\":[{\"text\":\"1) 10011010\"},{\"text\":\"2) 10011110\"},{\"text\":\"3) 10011111\"}]"+
					"},"+
					"{"+
						"\"text\":\"В некоторой стране автомобильный номер состоит из 7 символов. В качестве символов используют 18 различных букв и десятичные цифры в любом порядке. Каждый такой номер в компьютерной программе записывается минимально возможным и одинаковым целом количеством байтов, при этом используют посимвольное кодирование и все символы кодируются одинаковым и минимально возможным количеством битов. Определите объем памяти, отводимый этой программой для записи 60 номеров.\","+
						"\"picQ\":null,"+
						"\"if_pictured\":false,"+
						"\"picA\":null,"+
						"\"ans_count\":4,"+
						"\"answers\":[{\"text\":\"1) 240 байт\"},{\"text\":\"2) 300 байт\"},{\"text\":\"3) 360 байт\"},{\"text\":\"4) 420 байт\"}]"+
					"},"+
					"{"+
						"\"text\":\"На рисунке представлена часть кодовой таблицы ASCII. Каков шестнадцатеричный код символа q?\","+
						"\"picQ\":\"file://E:/Unity_Pics/q3.jpg\","+
						"\"if_pictured\":false,"+
						"\"picA\":null,"+
						"\"ans_count\":5,"+
						"\"answers\":[{\"text\":\"1) 71\"},{\"text\":\"2) 83\"},{\"text\":\"3) А1\"},{\"text\":\"4) В3\"},{\"text\":\"5) FF\"}]"+
					"},"+
					"{"+
						"\"text\":\"Вычислите сумму чисел X и Y. Результат представьте в двоичном виде. X = 110111 (двоичная система), Y = 135 (восьмеричная система).\","+
						"\"picQ\":null,"+
						"\"if_pictured\":false,"+
						"\"picA\":null,"+
						"\"ans_count\":3,"+
						"\"answers\":[{\"text\":\"1) 11010100\"},{\"text\":\"2) 10100100\"},{\"text\":\"3) 10010100\"}]"+
					"},"+
					"{"+
						"\"text\":\"Определите значение переменной c после выполнения фрагмента программы, представленного на рисунке (фрагмент записан на разных языках программирования).\","+
						"\"picQ\":\"file://E:/Unity_Pics/q5.jpg\","+
						"\"if_pictured\":false,"+
						"\"picA\":null,"+
						"\"ans_count\":5,"+
						"\"answers\":[{\"text\":\"1) с = 20\"},{\"text\":\"2) с = 70\"},{\"text\":\"3) с = -20\"},{\"text\":\"4) с = 180\"},{\"text\":\"5) с = 220\"}]"+
					"},"+
					"{"+
						"\"text\":\"В программе используется одномерный целочисленный массив А с индексами от 0 до 10. На рисунке представлен фрагмент программы, записанный на разных языках программирования, в котором значения элементов сначала задаются, а затем меняются. Чему будут равны элементы этого массива после выполнения фрагмента программы?\","+
						"\"picQ\":\"file://E:/Unity_Pics/q6.jpg\","+
						"\"if_pictured\":true,"+
						"\"picA\":\"file://E:/Unity_Pics/a6.jpg\","+
						"\"ans_count\":4,"+
						"\"answers\":[]"+
					"}"+
				"],\"paragraphs\":[]},"+
				"{\"id\":\"55555555-4444-0000-0000-000000000000\",\"name\":\"Тестовые задания А (2)\",\"type\":\"test\",\"questions\":["+
					"{\"text\":\"Вопрос 1\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 11\"},{\"text\":\"1) Ответ 12\"},{\"text\":\"1) Ответ 13\"}]},"+
					"{\"text\":\"Вопрос 2\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 21\"},{\"text\":\"1) Ответ 22\"},{\"text\":\"1) Ответ 23\"}]},"+
					"{\"text\":\"Вопрос 3\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 31\"},{\"text\":\"1) Ответ 32\"},{\"text\":\"1) Ответ 33\"}]},"+
					"{\"text\":\"Вопрос 4\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 41\"},{\"text\":\"1) Ответ 42\"},{\"text\":\"1) Ответ 43\"}]},"+
					"{\"text\":\"Вопрос 5\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 51\"},{\"text\":\"1) Ответ 52\"},{\"text\":\"1) Ответ 53\"}]},"+
					"{\"text\":\"Вопрос 6\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 61\"},{\"text\":\"1) Ответ 62\"},{\"text\":\"1) Ответ 63\"}]},"+
					"{\"text\":\"Вопрос 7\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 71\"},{\"text\":\"1) Ответ 72\"},{\"text\":\"1) Ответ 73\"}]},"+
					"{\"text\":\"Вопрос 8\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 81\"},{\"text\":\"1) Ответ 82\"},{\"text\":\"1) Ответ 83\"}]},"+
					"{\"text\":\"Вопрос 9\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 91\"},{\"text\":\"1) Ответ 92\"},{\"text\":\"1) Ответ 93\"}]}"+
				"],\"paragraphs\":[]},"+
				"{\"id\":\"55555555-5555-0000-0000-000000000000\",\"name\":\"Тестовые задания А (3)\",\"type\":\"test\",\"questions\":["+
					"{\"text\":\"Вопрос 11\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 11_1\"},{\"text\":\"1) Ответ 11_2\"},{\"text\":\"1) Ответ 11_3\"}]},"+
					"{\"text\":\"Вопрос 12\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 12_1\"},{\"text\":\"1) Ответ 12_2\"},{\"text\":\"1) Ответ 12_3\"}]},"+
					"{\"text\":\"Вопрос 13\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 13_1\"},{\"text\":\"1) Ответ 13_2\"},{\"text\":\"1) Ответ 13_3\"}]},"+
					"{\"text\":\"Вопрос 14\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 14_1\"},{\"text\":\"1) Ответ 14_2\"},{\"text\":\"1) Ответ 14_3\"}]},"+
					"{\"text\":\"Вопрос 15\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 15_1\"},{\"text\":\"1) Ответ 15_2\"},{\"text\":\"1) Ответ 15_3\"}]},"+
					"{\"text\":\"Вопрос 16\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 16_1\"},{\"text\":\"1) Ответ 16_2\"},{\"text\":\"1) Ответ 16_3\"}]},"+
					"{\"text\":\"Вопрос 17\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 17_1\"},{\"text\":\"1) Ответ 17_2\"},{\"text\":\"1) Ответ 17_3\"}]},"+
					"{\"text\":\"Вопрос 18\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 18_1\"},{\"text\":\"1) Ответ 18_2\"},{\"text\":\"1) Ответ 18_3\"}]},"+
					"{\"text\":\"Вопрос 19\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 19_1\"},{\"text\":\"1) Ответ 19_2\"},{\"text\":\"1) Ответ 19_3\"}]},"+
					"{\"text\":\"Вопрос 20\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 20_1\"},{\"text\":\"1) Ответ 20_2\"},{\"text\":\"1) Ответ 20_3\"}]},"+
					"{\"text\":\"Вопрос 21\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 21_1\"},{\"text\":\"1) Ответ 21_2\"},{\"text\":\"1) Ответ 21_3\"}]},"+
					"{\"text\":\"Вопрос 22\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 22_1\"},{\"text\":\"1) Ответ 22_2\"},{\"text\":\"1) Ответ 22_3\"}]},"+
					"{\"text\":\"Вопрос 23\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 23_1\"},{\"text\":\"1) Ответ 23_2\"},{\"text\":\"1) Ответ 23_3\"}]},"+
					"{\"text\":\"Вопрос 24\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 24_1\"},{\"text\":\"1) Ответ 24_2\"},{\"text\":\"1) Ответ 24_3\"}]},"+
					"{\"text\":\"Вопрос 25\",\"picQ\":null,\"if_pictured\":false,\"picA\":null,\"ans_count\":3,\"answers\":[{\"text\":\"1) Ответ 25_1\"},{\"text\":\"1) Ответ 25_2\"},{\"text\":\"1) Ответ 25_3\"}]}"+
				"],\"paragraphs\":[]}"+
			"]}"+
		"]"+
	"}";

//здесь будут ссылки на мониторы со статистикой, которой займется скрипт StatisticParser
var statDisplays : GameObject[];
var sdlng : int;

function CourseConstructor(JSONStringFromServer : String) {
	var collected = GameObject.FindGameObjectsWithTag("Clone");
	for (var z in collected) GameObject.Destroy(z);
	sdlng = 0;
	
	var DATA : Course = JsonFx.Json.JsonReader.Deserialize.<Course>(JSONStringFromServer);
	//JsonFx - это парсер, который лежит в ассетах в папке Assemblies
	//он должен там просто быть, никаких других ссылок или связей настраивать не надо
					
	//строим главный коридор и получаем массив ссылок на его кусочки
	//c_main[0] - это начало, c_main[c_main.length-1] - конец, а все между - серединки
	var c_main : GameObject[] = BuildMainCorridor(DATA.themes);
	statDisplays = new GameObject[DATA.themes.Count + 1];
	statDisplays[sdlng] = c_main[c_main.length-1].transform.Find("StatDisplay").gameObject; sdlng++;	
	//начинаем строить коридоры тем
	var c_other : List.<GameObject[]> = new List.<GameObject[]>(); var y = 0;
	for (var i=0; i<DATA.themes.Count; i++) {
		//готовим статистику >>>
		c_other[i] = BuildThemeCorridor(DATA.themes[i].contents, y);
		statDisplays[sdlng] = c_other[i][c_other[i].length-1].transform.Find("StatDisplay").gameObject; sdlng++;
		c_other[i][0].transform.Find("Timer").GetComponent.<TimerTheme>().theme_num = i;
		//<<< готовим статистику
		y += 10;
		//устанавливаем перекрестную связь между двумя будками
		//если номер темы четный (нумерация с нуля),
		//то будка-отправитель находится на левой стороне главного коридора, иначе на правой
		if (i % 2 == 0) {
			c_main[1+i/2].transform.Find("TeleportBooth_Left").GetComponent.<TeleportScript>().Destination = 
				c_other[i][0].transform.Find("TeleportBooth").gameObject;
			c_other[i][0].transform.Find("TeleportBooth").GetComponent.<TeleportScript>().Destination = 
				c_main[1+i/2].transform.Find("TeleportBooth_Left").gameObject;
		} else {
			c_main[1+i/2].transform.Find("TeleportBooth_Right").GetComponent.<TeleportScript>().Destination = 
				c_other[i][0].transform.Find("TeleportBooth").gameObject;
			c_other[i][0].transform.Find("TeleportBooth").GetComponent.<TeleportScript>().Destination = 
				c_main[1+i/2].transform.Find("TeleportBooth_Right").gameObject;	
		}		
	}
	
	//достраиваем лекционные и тестовые комнаты, сразу инициализируем их и задаем аналогичную связь между будками
	var room : GameObject;
	var y1 = 0; var y2 = -1.25;
	for (i=0; i<DATA.themes.Count; i++) {
		var test_num = 0; var lec_num = 0;
		for (var j=0; j<DATA.themes[i].contents.Count; j++) {
			if (DATA.themes[i].contents[j].type == "test") {
				room = Instantiate(QuizRoomA); room.tag = "Clone";
				room.transform.position.y = y2; y2 += 10;
				room.transform.Find("Board To Move/BoardGroup").GetComponent.<Board>().generateTest(DATA.themes[i].contents[j], i, test_num);
				room.transform.Find("Timer").GetComponent.<TimerTest>().theme_num = i;
				room.transform.Find("Timer").GetComponent.<TimerTest>().test_num = test_num;
				test_num++;
			}
			else if (DATA.themes[i].contents[j].type == "lecture") {
				room = Instantiate(LectureRoom); room.tag = "Clone";
				room.transform.position.y = y1; y1 += 10;
				room.transform.Find("Stands").GetComponent.<InputScript>().generateLecture(DATA.themes[i].contents[j], i, lec_num);
				room.transform.Find("Timer").GetComponent.<TimerLecture>().theme_num = i;
				room.transform.Find("Timer").GetComponent.<TimerLecture>().lec_num = lec_num;
				lec_num++;
			}
			if (j % 2 == 0) {
				c_other[i][1+j/2].transform.Find("TeleportBooth_Left").GetComponent.<TeleportScript>().Destination = 
					room.transform.Find("TeleportBooth").gameObject;
				room.transform.Find("TeleportBooth").GetComponent.<TeleportScript>().Destination = 
					c_other[i][1+j/2].transform.Find("TeleportBooth_Left").gameObject;
			} else {
				c_other[i][1+j/2].transform.Find("TeleportBooth_Right").GetComponent.<TeleportScript>().Destination = 
					room.transform.Find("TeleportBooth").gameObject;
				room.transform.Find("TeleportBooth").GetComponent.<TeleportScript>().Destination = 
					c_other[i][1+j/2].transform.Find("TeleportBooth_Right").gameObject;
			}
		}
	}
	
	collected = GameObject.FindGameObjectsWithTag("Anchor");
	for (z in collected) z.SetActive(false);
	
	GameObject.Find("Hallway/Course Selection/CS_Screen").GetComponent.<CourseSelection>().ZoomOut();
}

function BuildMainCorridor(themes : List.<Theme>) {
	var c : List.<GameObject> = new List.<GameObject>(); c[0] = MainCorridorStart; var k = 0;
	var a1 : GameObject; var a2 : GameObject;
	for (var i=0; i<themes.Count; i++) {
		if (i % 2 == 0) {
			k++;
			c[k] = Instantiate(MainCorridorMiddle); c[k].tag = "Clone";
			c[k].transform.Find("MonitorLeft/Text").GetComponent(TextMesh).text = themes[i].name;
			a1 = c[k-1].transform.Find("Anchor_Next").gameObject;
			a2 = c[k].transform.Find("Anchor_Prev").gameObject;
			c[k].transform.position = a1.transform.position - a2.transform.localPosition;
		} else {
			c[k].transform.Find("MonitorRight/Text").GetComponent(TextMesh).text = themes[i].name;
		}
	}
	
	if (themes.Count % 2 == 1) {
		Destroy(c[k].transform.Find("MonitorRight").gameObject);
		Destroy(c[k].transform.Find("TeleportBooth_Right").gameObject);
	}
	
	c[k+1] = Instantiate(MainCorridorEnd); c[k+1].tag = "Clone";
	a1 = c[k].transform.Find("Anchor_Next").gameObject;
	a2 = c[k+1].transform.Find("Anchor_Prev").gameObject;
	c[k+1].transform.position = a1.transform.position - a2.transform.localPosition;
	
	//расширяем на весь коридор коллайдер, который отвечает за расчет проведенного в нем времени
	c[0].transform.Find("Timer").GetComponent(BoxCollider).size.z = (k+2)*6;
	c[0].transform.Find("Timer").GetComponent(BoxCollider).center.z = (k+2)*6/2;
	//устанавливаем скрипту, который будет считать время, ссылку на текст монитора, отображающий время
	c[0].transform.Find("Timer").GetComponent.<TimerCourse>().TextTime =
		c[k+1].transform.Find("StatDisplay/TextTime").gameObject;
	
	return c.ToArray();
}

//практически аналогична предыдущей, но для лучшей читабельности кода я их объединять не стал
function BuildThemeCorridor(contents : List.<ThemeContent>, y : int) {
	var c : List.<GameObject> = new List.<GameObject>(); var k = 0;
	var a1 : GameObject; var a2 : GameObject;
	
	c[k] = Instantiate(ThemeCorridorStart); c[k].tag = "Clone";
	c[k].transform.position.y = y;
	
	for (var i=0; i<contents.Count; i++) {
		if (i % 2 == 0) {
			k++;
			c[k] = Instantiate(ThemeCorridorMiddle); c[k].tag = "Clone";
			c[k].transform.Find("MonitorLeft/Text").GetComponent(TextMesh).text = contents[i].name;
			a1 = c[k-1].transform.Find("Anchor_Next").gameObject;
			a2 = c[k].transform.Find("Anchor_Prev").gameObject;
			c[k].transform.position = a1.transform.position - a2.transform.localPosition;
		} else {
			c[k].transform.Find("MonitorRight/Text").GetComponent(TextMesh).text = contents[i].name;
		}
	}
	
	if (contents.Count % 2 == 1) {
		Destroy(c[k].transform.Find("MonitorRight").gameObject);
		Destroy(c[k].transform.Find("TeleportBooth_Right").gameObject);
	}
	
	c[k+1] = Instantiate(ThemeCorridorEnd); c[k+1].tag = "Clone";
	a1 = c[k].transform.Find("Anchor_Next").gameObject;
	a2 = c[k+1].transform.Find("Anchor_Prev").gameObject;
	c[k+1].transform.position = a1.transform.position - a2.transform.localPosition;
	
	//расширяем на весь коридор коллайдер, который отвечает за расчет проведенного в нем времени
	c[0].transform.Find("Timer").GetComponent(BoxCollider).size.z = (k+2)*6;
	c[0].transform.Find("Timer").GetComponent(BoxCollider).center.z = (k+2)*6/2;
	//устанавливаем скрипту, который будет считать время, ссылку на текст монитора, отображающий время
	c[0].transform.Find("Timer").GetComponent.<TimerCourse>().TextTime =
		c[k+1].transform.Find("StatDisplay/TextTime").gameObject;	
	
	return c.ToArray();
}