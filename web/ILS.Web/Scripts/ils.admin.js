Ext.ns('ils', 'ils.admin');

Ext.require('Ext.ux.grid.*');

if (Ext.util.Cookies.get("language") == null) Ext.util.Cookies.set("language", lang_pref);
if (Ext.util.Cookies.get("language") == "Russian") isRussian = true; else isRussian = false;
ils.admin.textAdd = 'Add User';
ils.admin.textRemove = 'Remove User';
ils.admin.textSaveChanges = 'Save Changes';
ils.admin.textToggle = 'Approve User';
ils.admin.textName = 'User Name';
ils.admin.textEmail = 'Email';
ils.admin.textIsApproved = 'Active';
ils.admin.promptEmail = 'Email';
ils.admin.promptEmailText = 'Please enter your email:';
ils.admin.promptName = 'Name';
ils.admin.promptNameText = 'Please enter your name:';
ils.admin.promptRemove = 'Remove User';
ils.admin.promptRemoveText = 'Are you sure?';
ils.admin.alert = 'Info';
ils.admin.alertText = 'No rows selected';
ils.admin.gridName = 'List of users';
if (isRussian)
{
	ils.admin.textAdd = 'Добавить пользователя';
	ils.admin.textRemove = 'Удалить пользователя';
	ils.admin.textSaveChanges = 'Сохранить изменения';
	ils.admin.textToggle = 'Утвердить пользователя';
	ils.admin.textName = 'Имя';
	ils.admin.textEmail = 'Email';
	ils.admin.textIsApproved = 'Утвержден';
	ils.admin.promptEmail = 'Email';
	ils.admin.promptEmailText = 'Пожалуйста, введите email:';
	ils.admin.promptName = 'Имя';
	ils.admin.promptNameText = 'Пожалуйста, введите имя:';
	ils.admin.promptRemove = 'Удаление пользователя';
	ils.admin.promptRemoveText = 'Вы уверены?';
	ils.admin.alert = 'Информация';
	ils.admin.alertText = 'Не выбрана ни одна строка';
	ils.admin.gridName = 'Список пользователей';
}

Ext.define('UserModel', {
    extend: 'Ext.data.Model',
    fields: [{
			name: 'Name',
			type: 'string'
		}, {
			name: 'Email',
			type: 'string'
		}, {
			name: 'IsApproved',
			type: 'boolean'
	}]
});

ils.admin.store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        api: {
            read : ils.admin.readUser,
            create : ils.admin.createUser,
            update: ils.admin.updateUser,
            destroy: ils.admin.deleteUser
        },
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		afterRequest: function(req, res) {
              
			var a = eval('(' + req.operation.response.responseText + ')');
			
			ils.admin.store.loadData([],false);
			
			for (var Name in a) {
				if(a.hasOwnProperty(Name)){
					ils.admin.store.add(a[Name]);
				}
			}
			
			
        }
    }),
	model:  UserModel,
    reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data'
        }, UserModel),
	writer: new Ext.data.JsonWriter({
            encode: false,
            listful: true,
            writeAllFields: true
        }),
    autoSave: true,
    autoLoad: true,
    remoteSort: false
});

ils.admin.userGrid = new Ext.grid.GridPanel({
    store: ils.admin.store,
    columns: [
	
    {
        
        header: ils.admin.textName,
        dataIndex: 'Name',
        width: 220,
        sortable: true,
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    },{
        header: ils.admin.textEmail,
        dataIndex: 'Email',
        width: 150,
        sortable: true,
        editor: {
            xtype: 'textfield',
            allowBlank: false
            
        }
    },{
        xtype: 'booleancolumn',
        header: ils.admin.textIsApproved,
        dataIndex: 'IsApproved',
        width: 100,
        trueText: 'Yes',
        falseText: 'No',
        editor: {
            xtype: 'checkbox'
        }
    }],
	tbar: [{
                iconCls: 'icon-user-add',
                text: ils.admin.textAdd,
                handler: function () {
					var enteredName = 'New Friend';
					var enteredEmail = 'new@google.com';
					Ext.Msg.prompt(ils.admin.promptName, ils.admin.promptNameText, function(btn, text){
						if (btn == 'ok'){
							enteredName = text;
							Ext.Msg.prompt(ils.admin.promptEmail, ils.admin.promptEmailText, function(btn, text){
								if (btn == 'ok'){
									enteredEmail = text;
									var e = new UserModel({
										Name: enteredName,
										IsApproved: 'false',
										Email: enteredEmail
									});
									//editor.stopEditing();
									//store.insert(0, e);
									ils.admin.store.add(e);
									//grid.getView().refresh();
									//grid.getSelectionModel().selectRow(0);
									//editor.startEditing(0);
								}
							});
						}
					});
					
                    
                }
            }, {
                ref: '../removeBtn',
                iconCls: 'icon-user-delete',
                text: ils.admin.textRemove,
                handler: function () {
                    //editor.stopEditing();
					var grid = this.up('grid');
                    var s = grid.getSelectionModel().getSelection();
					if (!s.length) {
						Ext.Msg.alert(ils.admin.alert, ils.admin.alertText);
						return;
					}
					Ext.Msg.confirm(ils.admin.promptRemove, ils.admin.promptRemoveText, function (button) {
						if (button == 'yes') {
							ils.admin.store.remove(s[0]);
						}
					});
                    //for (var i = 0, r; r = s[i]; i++) {
                        
                    //}
                }
            }, {
                iconCls: 'icon-user-change',
                text: ils.admin.textToggle,
                handler: function () {
                    //editor.stopEditing();
					var grid = this.up('grid');
                    var s = grid.getSelectionModel().getSelection();
					if (!s.length) {
						Ext.Msg.alert(ils.admin.alert, ils.admin.alertText);
						return;
					}
					var index = grid.store.indexOf(s[0]);
					ils.admin.store.data.items[index].data.IsApproved = !ils.admin.store.data.items[index].data.IsApproved;
					grid.getView().refresh();
					//ils.admin.store.remove(s[0]);
					//s[0].data.IsApproved = !s[0].data.IsApproved;
					//ils.admin.store.add(s[0]);
                }
            }, {
                iconCls: 'icon-user-save',
                text: ils.admin.textSaveChanges,
                handler: function () {
                    ils.admin.store.save();
                }
            }]
});

Ext.onReady(function(){
	ils.admin.layout = new Ext.Panel({
        title: ils.admin.gridName,
        layout: 'fit',
        layoutConfig: {
            columns: 1
        },
        width: 600,
        height: 600,
        items: [ils.admin.userGrid]
    });
	
	renderToMainArea(ils.admin.layout);
	
});