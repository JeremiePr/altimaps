/**
 * background.js
 * created on 06/08/2018
 * by Jeremie Primas
 */


// Store the last request URL called
let url = "";

// Create a listener that intercepts HTTP request calls with URLs that match the following pattern
chrome.webRequest.onBeforeRequest.addListener(req => {
	// Prevent from calling again the same request
	if(req.url !== url) {
		url = req.url;
		// Calls the server with the request made by the page
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

/**
 * Function called on request success
 * @param res 
 */
function onRequestSuccess(res) {
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

/**
 * Function called on request error
 * @param err 
 */
function onRequestError(err) {
	console.log(err);
}

/**
 * Function that transforms the request raw payload into the altitude
 * @param raw is the text received after the URL call
 */
function getAltitude(raw) {
	// Remove the first characters and transform the rest as JSON
	let json = JSON.parse(raw.substring(4));
	// Parse the json file to reach the altitude value
	return parseInt(json[1][0][5][0][1][1][0]);
}