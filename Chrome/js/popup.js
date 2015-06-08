chrome.browserAction.onClicked.addListener(editCurrent);

function editCurrent(currentTab){
	chrome.tabs.getAllInWindow();
};

function showInTabs(tabs){
	var numTabs = tabs.length;
	for (var i = 0; i < numTabs; i++){
		var section = document.createElement('DIV');
		document.body.appendChild(section);
	}
};