//alert("hi");
chrome.tabs.getAllInWindow(showInTabs);
var limit = 3;

function showInTabs(tabs){
	var numTabs = tabs.length;
	var body = document.getElementsByTagName('tbody')[0];
	for (var i = 0; i < numTabs; i++){
		if (i == limit){
			moreButton(tabs, numTabs, body, i);
			break;
		}
		else{			
			create(tabs, body, i);
		}
	}
};

function moreButton (tabs, numTabs, body, i){
	var row = body.insertRow(i);
	var sub = row.insertCell(0);
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'More');
	button.addEventListener("click",
		function(event){
			if (event.target.value == 'More'){
				for (var j = limit; j < numTabs; j++){
					create(tabs, body, j);
				}
				event.target.value = 'Less';
			}else{
				for (var j = numTabs; j > limit; --j){
					body.deleteRow(j - 1);
				}
				event.target.value = 'More';
			}
		}
	);
	sub.appendChild(button);
}

function create(tabs, body, i){
	//create the image
	var row = body.insertRow(i);
	var section = row.insertCell(0);
	var image = document.createElement('img');
	image.src = tabs[i].favIconUrl;
	section.appendChild(image);
	
	//create the slider
	var slide = row.insertCell(1);
	var range = document.createElement("input");
	range.setAttribute('type', 'range');
	range.setAttribute('max', '100');
	range.setAttribute('min', '0');
	range.setAttribute('step', '1');
	range.setAttribute('value', '100');
	range.setAttribute('defaultValue', '100');
	range.setAttribute('name', 'rng' + i);
	range.addEventListener("click", function(event){
		//check for media
		alert(event.target.name + " clicked to " + event.target.value);
		chrome.tabs.sendMessage(tabs[i].id, {"method": "getHTML", "iconNum": i, "value": event.target.value}, function(response){
			//alert("some response\n" + response);
			if (response.method == "getHTML"){
				if (response.data){
					var amount = response.data.length;
					for (var j = 0; j < amount; j++){
						response.data[j].volume = response.value;
					}
				}
			}
		});
	});
	slide.appendChild(range);
};