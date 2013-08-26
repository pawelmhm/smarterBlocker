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
						chrome.tabs.update(windowList[i].tabs[j].id,sm.create_tab());
						console.log("tab " + windowList[i].tabs[j].url + " updated ");
						//windowList[i].tabs[j].update(sm.create_tab());
					}
				}
			}; 
			//sm.notify_server(JSON.stringify(tabs));
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
	blacklist: ["www.sport.pl","python","mozilla"],
	whitelist: ["http://i.imgur.com/p1ehIp7.jpg", "http://i.imgur.com/FqZpbc0.gif",
	"http://www.reddit.com/r/NoFap/comments/15lrh7/16_habits_you_should_do_everyday_this_changed_my/", 
	"http://i.imgur.com/1FXLs.png", "http://i.imgur.com/lMXLvYK.png", "http://i.imgur.com/zcBWksT.gif", 
	"http://i.imgur.com/32hBq.jpg", "http://i.imgur.com/cgEgjXn.jpg", "http://i.imgur.com/seJy0.gif", 
	"http://i.imgur.com/nP2oXSp.png", "http://i.imgur.com/DJK3kva.jpg?1", "http://imgur.com/pptNR", 
	"http://i.imgur.com/nV6gK0v.jpg"], 	
	create_tab: function () {
		var createProperties = {
			url: this.chooseRandom(),
			active: true,
		}
		return createProperties	//chrome.tabs.create(createProperties);
	},
	chooseRandom: function () {
		return this.whitelist[Math.floor(Math.random() * ((this.whitelist.length-1)
		- 0 + 1) + 0)]
	}		
};

document.addEventListener('DOMContentLoaded',function() {
//	send_message.loadWindowList();
	//send_message.rescue_me();
	//console.log(send_message.chooseRandom())
});
chrome.tabs.onCreated.addListener(function (tab) {
	console.log("tab created! at " + new Date() + " with url " + tab.url );
});
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo,tab) {
	console.log("tab updated! at " + new Date() + " with url " + tab.url + " with id " + tabid + " changes " + changeinfo.status
		+ " " + changeinfo.url);
});
