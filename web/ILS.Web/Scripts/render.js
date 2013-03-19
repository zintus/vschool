var virtual_world = new Ext.panel.Panel({
    html: '<div id="unityPlayer"></div>'
});

var embedded = false;
var width; var height;

virtual_world.on('afterlayout', function (container, layout) {
    if (!embedded && typeof unityObject != "undefined") {
        width = container.getWidth();
        height = container.getHeight();
        if (width < 200 || height < 200) return;
        embedded = true;

        //это для того, чтобы в Юнити по нажатию правой кнопки не вылезало контекстное меню
        var params = { disableContextMenu: true };
        unityObject.embedUnity("unityPlayer", link_unityfile, width, height, params);

        if (document.getElementById("unityPlayer").childNodes[0].tagName == "DIV") {
            document.getElementById("unityPlayer").childNodes[0].style.width = "500px";
            document.getElementById("unityPlayer").childNodes[0].childNodes[0].style.height = "125px";
            document.getElementById("unityPlayer").childNodes[0].childNodes[0].style.top = "-62px";
            document.getElementById("unityPlayer").childNodes[0].childNodes[0].title = "";
            document.getElementById("getunity").width = 500;
            document.getElementById("getunity").height = 125;
            document.getElementById("getunity").src = getUnityImage;            
        }
    }
});

Ext.onReady(function () {    
    renderToMainArea(virtual_world);
});

//ФУНКЦИИ, ВЫЗЫВАЕМЫЕ ИЗНУТРИ ЮНИТИ

function GetLanguage() {
    var unity = unityObject.getObjectById("unityPlayer");
    if (isRussian) unity.SendMessage("Bootstrap", "SetLanguage", 0);
    else unity.SendMessage("Bootstrap", "SetLanguage", 1);
}

function GetLanguageCust() {
    var unity = unityObject.getObjectById("unityPlayer");
    if (isRussian) unity.SendMessage("_Customization", "SetLanguage", 0);
    else unity.SendMessage("_Customization", "SetLanguage", 1);
}

function LoadRPG() {
    Ext.Ajax.request({
        url: link_unityRPG,
        method: 'POST',
        success: function (responseObject) {
            var unity = unityObject.getObjectById("unityPlayer");
            unity.SendMessage("Bootstrap", "RoleSystemSet", responseObject.responseText);
        }
    });
}

function SaveRPG(s) {
    Ext.Ajax.request({
        url: link_unitysaveRPG,
        params: { s: s },
        method: 'POST'
    });
}

function LoadCoursesList() {
    Ext.Ajax.request({
        url: link_unitylist,
        method: 'POST',
        success: function (responseObject) {
            var unity = unityObject.getObjectById("unityPlayer");
            unity.SendMessage("CS_Screen", "CourseDisplay", responseObject.responseText);
        }
    });
}

function LoadCourseData(id) {
    var flag = false; var s = "";
    Ext.Ajax.request({
        url: link_unitydata,
        params: { id: id },
        method: 'POST',
        success: function (responseObject) {
            if (!flag) {
                flag = true; s = responseObject.responseText;
            } else {
                var unity = unityObject.getObjectById("unityPlayer");
                unity.SendMessage("Bootstrap", "CourseConstructor", responseObject.responseText);
                unity.SendMessage("Bootstrap", "StatisticDisplay", s);
            }
        }
    });
    Ext.Ajax.request({
        url: link_unitystat,
        params: { id: id },
        method: 'POST',
        success: function (responseObject) {
            if (!flag) {
                flag = true; s = responseObject.responseText;
            } else {
                var unity = unityObject.getObjectById("unityPlayer");
                unity.SendMessage("Bootstrap", "CourseConstructor", s);
                unity.SendMessage("Bootstrap", "StatisticDisplay", responseObject.responseText);
            }
        }
    });
}

function SaveStatistic(s) {
    Ext.Ajax.request({
        url: link_unitysave,
        params: { s: s },
        method: 'POST'
    });
}

function SaveTestResult(mode, id1, id2, a, t) {
    Ext.Ajax.request({
        url: link_unitytest,
        params: { mode: mode, theme_run_id: id1, test_id: id2, answers: a, time: t },
        method: 'POST',
        success: function (responseObject) {
            var unity = unityObject.getObjectById("unityPlayer");
            var res = parseInt(responseObject.responseText, 10);            
            unity.SendMessage("FinishTestObject_"+id2, "DisplayResults", res);
        }
    });
}