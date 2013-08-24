var send_message = {
	
	server_url: "http://sio.com:5000/xml",
	
	notify_server: function (data) {
		var req = new XMLHttpRequest();
		req.onload = function () {
			document.write(req.responseText);
			}
		req.open("POST",this.server_url,true);
		req.send(data);
	},

	loadWindowList: function () {
		sm = this;
		chrome.windows.getAll({populate:true},function (windowList){
			var tabs={};
			tabIds =[];
			for (var i=0; i < windowList.length;i++){
				for (var j=0;j < windowList[i].tabs.length; j++) {
					if (sm.checkTabs(windowList[i].tabs[j].url)) {
						tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j].url;
						//sm.rescue_user(windowList[i].tabs[j]);
						//windowList[i].replace("localhost");
						windowList[i].tabs[j].url = "love";
					}
				}
			}; 
			sm.notify_server(JSON.stringify(tabs));
		});	
	},

	checkTabs: function (taburl) {
		for (var i=0;i< this.blacklist.length;i+= 1) {
			if (taburl.search(this.blacklist[i]) != -1) {
				return true;
			}
		}
		return false;			
	},
	blacklist: ["reddit","python","mozilla"],
	rescue_user: function (tab) { window.location.replace(this.whitelist[0]);},
	whitelist: ["https://google.com"], 
};

document.addEventListener('DOMContentLoaded',function() {
	send_message.loadWindowList();
});

