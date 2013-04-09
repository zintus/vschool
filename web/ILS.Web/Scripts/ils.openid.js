Ext.ns('ils', 'ils.openid');



if (Ext.util.Cookies.get("language") == null) Ext.util.Cookies.set("language", lang_pref);
if (Ext.util.Cookies.get("language") == "Russian") isRussian = true; else isRussian = false;
ils.openid.panelName = 'Login via OpenID';
if (isRussian)
{
	ils.openid.panelName = 'Вход через OpenID';
}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1;
  var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
  var query      = url.slice(queryStart, queryEnd - 1);

  if (query === url || query === "") return;

  var params  = {};
  var nvPairs = query.replace(/\+/g, " ").split("&");

  for (var i=0; i<nvPairs.length; i++) {
    var nv = nvPairs[i].split("=");
    var n  = decodeURIComponent(nv[0]);
    var v  = decodeURIComponent(nv[1]);
    if ( !(n in params) ) {
      params[n] = [];
    }
    params[n].push(nv.length === 2 ? v : null);
  }
  return params;
}



ils.openid.bigButton = Ext.create('Ext.Button', {
    text: 'Click me',
    handler: function() {
		/*Ext.Ajax.request({
			url: 'http://localhost:8080/ILS/OpenID',    // where you wanna post
			success: function(response, opts) {
				var a = eval('(' + response.responseText + ')');
			    alert(a.data);
		    },
			jsonData: [{ 
					'foo': 'bar'
				}, {
					'foo': 'bar2'
				}
			]  // your json data
		});*/
		document.location.href = "http://localhost/vschool/?url=http://localhost:8080/ILS/OpenID";
        
    }
});

Ext.onReady(function(){
	ils.admin.layout = new Ext.Panel({
        title: ils.openid.panelName,
        layout: 'fit',
        layoutConfig: {
            columns: 1
        },
        width: 600,
        height: 600,
        items: [ils.openid.bigButton]
    });
	
	renderToMainArea(ils.admin.layout);
	
	var urlParams = parseURLParams(document.URL);
	if (urlParams != null && urlParams['login'] != null && urlParams['hash'] != null && urlParams['firstName'] != null && urlParams['lastName'] != null && urlParams['email'] != null) {
		Ext.Ajax.request({
				url: 'http://localhost:8080/ILS/OpenID',    
				success: function(response, opts) {
					var a = eval('(' + response.responseText + ')');
				},
				jsonData: [{ 
						'login' : urlParams['login'][0],
						'hash' : urlParams['hash'][0],
						'firstName' : urlParams['firstName'][0],
						'lastName' : urlParams['lastName'][0],
						'email' : urlParams['email'][0]
					}
				]
			});
	}
});