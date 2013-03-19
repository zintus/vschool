addEntity = function (link) {
    if (link == link_addCourse) { var pth = '/treeRoot'; var pid = ""; }
    else { pth = extractPath(currently_selected); pid = currently_selected.data.id; }
    Ext.Ajax.request({
        url: link, method: 'POST',
        params: { parent_id: pid },
        success: function (result) {
            treestore.load({ callback: function () { tree.selectPath(pth + '/' + result.responseText); } });
        }
    });
}

removeEntity = function (link) {
    if (currently_selected.parentNode.childNodes.length == 1)
        var pth = extractPath(currently_selected.parentNode);
    else if (currently_selected == currently_selected.parentNode.childNodes[0])
        pth = extractPath(currently_selected.parentNode.childNodes[1]);
    else pth = extractPath(currently_selected.parentNode.childNodes[0]);
    console.log(pth);

    Ext.Ajax.request({
        url: link,
        params: { id: currently_selected.data.id, parent_id: currently_selected.parentNode.data.id },
        method: 'POST',
        success: function () {
            treestore.load({ callback: function () { tree.selectPath(pth); } });
        }
    });
}
addDoc = function (link,type_file) {
    pth = extractPath(currently_selected);
    pid = currently_selected.data.id;
    var ip = new Ext.window.Window({
        layout: 'fit',
        title: 'Загрузка документа',
//        closable: false,
        resizable: false,
       // plain: true,
        border: false,
        modal: true,  autoShow: true,
        items: [
            Ext.create('Ext.form.Panel', {
               // title: 'File Uploader',
                
                bodyPadding: 10,
                frame: true,
                items: [                
                    {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'id',
                        value: pid

                    },
                    {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'type_file',
                        value: type_file

                    }, 
                    {
                        xtype: 'filefield',
                        name: 'file',
                        fieldLabel: 'Файл',
                        labelWidth: 30,
                        msgTarget: 'side',
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: 'Обзор...'
                    }
                ],

                buttons: [
                    {
                        text: 'Загрузить',
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url: link,
                                    waitMsg: 'Загрузка файла...',
                                    success: function (fp, o) {
                                        treestore.load({ callback: function () { tree.selectPath(pth); } });
                                        Ext.Msg.alert('Сообщение', 'Файл успешно загружен');
                                        ip.destroy();

                                    }
                                });
                            }
                        }
                    }
                ]
                
            })
            
            
        ]

        //,
       // listeners: { render: function (c) { c.getEl().on('click', function () { ip.destroy(); }); } }
            });
}



changeOrderNumber = function (link) {
    var pth = extractPath(currently_selected);
    Ext.Ajax.request({
        url: link, method: 'POST',
        params: {
            id: currently_selected.data.id,
            parent_id: currently_selected.parentNode.data.id,
            depth: currently_selected.getDepth(),
            type: currently_selected.raw.iconCls
        },
        success: function (result) {
            treestore.load({ callback: function () { tree.selectPath(pth); } });
        }
    });
}

//тулбар с кнопками, которые отвечают за добавление новых сущностей (функция addEntity),
//удаление сущностей (функция removeEntity) и изменение порядка сущностей (фукция changeOrderNumber)
//функции общие, меняются только ссылки на конкретные методы
var tlbar = new Ext.toolbar.Toolbar({
    items: [{
        text: 'Добавить курс', iconCls: 'course_add',
        handler: function () { addEntity(link_addCourse); }
    }, {
        text: 'Удалить курс', iconCls: 'course_remove',
        handler: function () { removeEntity(link_removeCourse); }
    }, {
        text: 'Добавить тему', iconCls: 'theme_add', hidden: true,
        handler: function () { addEntity(link_addTheme); }
    }, {
        text: 'Удалить тему', iconCls: 'theme_remove', hidden: true,
        handler: function () { removeEntity(link_removeTheme); }
    }, {
        text: 'Добавить лекцию', iconCls: 'lecture_add', hidden: true,
        handler: function () { addEntity(link_addLecture); }
    }, {
        text: 'Удалить лекцию', iconCls: 'lecture_remove', hidden: true,
        handler: function () { removeEntity(link_removeContent); }
    }, {
        text: 'Добавить тест', iconCls: 'add', hidden: true,
        handler: function () { addEntity(link_addTest); }
    }, {
        text: 'Удалить тест', iconCls: 'remove', hidden: true,
        handler: function () { removeEntity(link_removeContent); }
    }, {
        text: 'Добавить параграф', iconCls: 'paragraph_add', hidden: true,
        handler: function () { addEntity(link_addParagraph); }
    }, {
        text: 'Удалить параграф', iconCls: 'paragraph_remove', hidden: true,
        handler: function () { removeEntity(link_removeParagraph); }
    }, {
        text: 'Добавить вопрос', iconCls: 'add', hidden: true,
        handler: function () { addEntity(link_addQuestion); }    
    }, {
        text: 'Удалить вопрос', iconCls: 'remove', hidden: true,
        handler: function () { removeEntity(link_removeQuestion); }
    }, {
        text: 'Поднять', iconCls: 'move_up', hidden: true,
        handler: function () { changeOrderNumber(link_moveUp); }
    }, {
        text: 'Опустить', iconCls: 'move_down', hidden: true,
        handler: function () { changeOrderNumber(link_moveDown); }
    }, {
        text: 'Загрузить файл с лекцией', iconCls: 'paragraph_add', hidden: true,
        handler: function () { addDoc(link_addDoc, 'lecture'); }
    }, {
        text: 'Загрузить файл с тестом', iconCls: 'paragraph_add', hidden: true,
        handler: function () { addDoc(link_addDoc,'test'); }
    }]
});