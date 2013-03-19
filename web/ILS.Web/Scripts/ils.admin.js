Ext.ns('ils', 'ils.admin');

ils.admin.user = Ext.data.Record.create([{
    name: 'name',
    type: 'string'
}, {
    name: 'email',
    type: 'string'
}, {
    name: 'isApproved',
    type: 'boolean',
}]);

ils.admin.store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        api: {
            read : ils.admin.readUser,
            create : ils.admin.createUser,
            update: ils.admin.updateUser,
            destroy: ils.admin.destroyUser
        }
    }),
    reader: new Ext.data.JsonReader({fields: ils.admin.user}),
    autoSave: true,
    autoLoad: true,
    remoteSort: true
});

ils.admin.userGrid = new Ext.grid.GridPanel({
    store: ils.admin.store,
    plugins: [ new Ext.ux.grid.RowEditor({ saveText: 'Update' }) ],
    tbar: [{
        iconCls: 'icon-user-add',
        text: 'Add User',
        handler: function(){
            var e = new ils.admin.user({
                name: 'New Guy',
                email: 'new@exttest.com',
                active: true
            });
            editor.stopEditing();
            store.insert(0, e);
            grid.getView().refresh();
            grid.getSelectionModel().selectRow(0);
            editor.startEditing(0);
        }
    },{
        ref: '../removeBtn',
        iconCls: 'icon-user-delete',
        text: 'Remove User',
        disabled: true,
        handler: function(){
            editor.stopEditing();
            var s = grid.getSelectionModel().getSelections();
            for(var i = 0, r; r = s[i]; i++){
                store.remove(r);
            }
        }
    }],

    columns: [
    new Ext.grid.RowNumberer(),
    {
        id: 'name',
        header: 'User Name',
        dataIndex: 'name',
        width: 220,
        sortable: true,
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    },{
        header: 'Email',
        dataIndex: 'email',
        width: 150,
        sortable: true,
        editor: {
            xtype: 'textfield',
            allowBlank: false,
            vtype: 'email'
        }
    },{
        xtype: 'booleancolumn',
        header: 'Active',
        dataIndex: 'isApproved',
        align: 'center',
        width: 50,
        trueText: 'Yes',
        falseText: 'No',
        editor: {
            xtype: 'checkbox'
        }
    }]
});

Ext.onReady(function(){
    ils.admin.layout = new Ext.Panel({
        title: 'Users list',
        layout: 'fit',
        layoutConfig: {
            columns: 1
        },
        renderTo: 'root',
        width: 600,
        height: 600,
        items: [ils.admin.userGrid]
    });
});