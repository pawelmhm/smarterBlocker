var moblocker = {

	loadWindowList: function () {
		moblocker = this;
		chrome.windows.getAll({populate:true},function (windowList){
			var tabs={};
			for (var i=0; i < windowList.length;i++){
				for (var j=0;j < windowList[i].tabs.length; j++) {
					if (moblocker.checkTabs(windowList[i].tabs[j].url)) {
						moblocker.update_tab(windowList[i].tabs[j].id);
					}
				}
			}; 
		});	
	},

	checkTabs: function (taburl) {
		for (var i=0;i< blacklist.length;i++) {
			var tabRe  = "^" + taburl + "$";
			var re = new RegExp(tabRe);
			if (blacklist[i].search(re) > -1) {
				return true;
			}
		}
		return false;			
	},

	update_tab: function (tabid) {
		var createNewTab = {
			url: this.chooseRandom(),
			active: true,
		};
			chrome.tabs.update(tabid, createNewTab, function (tab) {
				console.log(new Date() + "tab url and id " +tab.id + " " + tab.url);
		})
	},

	chooseRandom: function () {
		return whitelist[Math.floor(Math.random() * ((whitelist.length-1)
		- 0 + 1) + 0)]
	},		 		
};

chrome.tabs.onUpdated.addListener(function (tabid,changeinfo,tab) {
	if (changeinfo.url) {
		if (moblocker.checkTabs(changeinfo.url)) {
			console.log("changeurl: " + changeinfo.url); 
			console.log(moblocker.checkTabs(changeinfo.url));
			moblocker.update_tab(tab.id);
		} else {
			console.log("status ok" + changeinfo.url);
		}
	}
});

