var moblocker = {
	loadWindowList: function () {
		moblocker = this;
		chrome.windows.getAll({populate:true},function (windowList){
			var tabs={};
			tabIds =[];
			for (var i=0; i < windowList.length;i++){
				for (var j=0;j < windowList[i].tabs.length; j++) {
					if (moblocker.checkTabs(windowList[i].tabs[j].url)) {
						//tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j].url;
						moblocker.update_tab(windowList[i].tabs[j].id);
					}
				}
			}; 
		});	
	},

	checkTabs: function (taburl) {
		for (var i=0;i< blacklist.length;i++) {
			if (taburl.search(blacklist[i]) != -1) {
				return true;
			}
		}
		return false;			
	},

	update_tab: function (tabid) {
		var createProperties = {
			url: this.chooseRandom(),
			active: true,
		};
		chrome.tabs.update(tabid, createProperties,function () {console.log("tab " + tabid + " updated ");});
	},

	chooseRandom: function () {
		return whitelist[Math.floor(Math.random() * ((whitelist.length-1)
		- 0 + 1) + 0)]
	},		 		
};

chrome.tabs.onCreated.addListener(function (tab) {
	console.log("tab created! at " + new Date() + " with url " + tab.url );
});

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo,tab) {
	if (moblocker.checkTabs(tab.url)) {
		moblocker.update_tab(tab.id); 
	} else {
		console.log("happy browsing at " + tab.url + " moblocker said " + 
			moblocker.checkTabs(tab.url));
	};
});
