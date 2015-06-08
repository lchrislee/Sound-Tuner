alert("content loaded");

chrome.runtime.onMessage.addListener(){
	function(request, sendMessage){
		alert("got request");
		if (request.method == "getHTML"){
			alert("request method correct");
			sendMessage({data: getHTML(), method: "getHTML", icon: request.icon});
		}
	}
};

function getHTML(){
	return document.body.outerHTML;
}