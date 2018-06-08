const pattern = "";

let url = "";

chrome.webRequest.onBeforeRequest.addListener(req => {
	if(req.url !== url) {
		url = req.url;
		$.ajax({
			url: url,
			data: null,
			dataType: "text",
			success: onRequestSuccess,
			error: onRequestError
		});
		$.get(url, {}, res => {
			console.log(res);
		});
	}
}, {
	urls: ["https://www.google.com/maps/photometa/v1*"]
});

let onRequestSuccess = res => {
	let altitude = getAltitude(res);
	chrome.tabs.query({
		active: true
	}, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, {
			origin: "AltiMaps",
			value: altitude
		});
	});
}

let onRequestError = err => {
	console.log(err);
}

let getAltitude = raw => {
	let json = JSON.parse(raw.substring(4));
	return parseInt(json[1][0][5][0][1][1][0]);
}