//alert("hi");
chrome.tabs.getAllInWindow(showInTabs);

function showInTabs(tabs){
	var numTabs = tabs.length;
	for (var i = 0; i < numTabs; i++){
		var section = document.createElement('div');
		
		//create the image
		var image = document.createElement('img');
		image.src = tabs[i].favIconUrl;
		section.appendChild(image);
		document.body.appendChild(section);
		
		//create the slider
		var range = document.createElement('input');
		range.setAttribute('type', 'range');
		range.setAttribute('max', '100');
		range.setAttribute('min', '0');
		range.setAttribute('step', '1');
		range.setAttribute('value', '100');
		range.setAttribute('defaultValue', '100');
		range.setAttribute('name', 'sldr' + i);
		section.appendChild(range);
		
		//check for media
		chrome.tabs.sendMessage(tabs[i].id, {method: "getHTML", icon: i}, function(response){
			//alert("some response\n" + response);
			if (response.method == "getHTML"){
				alert("response correct");
				//var list = document.body.getElementsByTagName("p");
				alert(response.data);
			}
		});
	}
};