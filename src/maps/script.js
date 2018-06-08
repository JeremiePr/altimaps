/**
 * script.js
 * created on 06/08/2018
 * by Jeremie Primas
 */


/**
 * Function that injects the altitude value in the DOM container element
 * @param altitude formatted altitude to inject in the DOM 
 */
function setAltitude(altitude) {
	document.querySelector("#am-altitude-container > p").innerHTML = `${altitude}m`;
}

/**
 * Function called on message received by the extension
 * @param message sent by the extension
 * @param sender identifies the message sender
 * @param sendResponse callback to notify the extension
 */
function onMessage(message, sender, sendResponse) {
	if(message.origin && message.value && message.origin === "AltiMaps") {
		setAltitude(message.value);
		sendResponse({
			origin: message.origin,
			value: "Success"
		});
	}
	else {
		sendResponse({
			origin: "AltiMaps",
			value: "Error: Arguments missing"
		});
	}
}

/**
 * Entry function
 */
function main() {
	// Inject the extension element inside the DOM body
	document.body.innerHTML += `<div id="am-altitude-container"><p></p></div>`;
	// Create a listener that trigger a callback function on message received
	chrome.runtime.onMessage.addListener(onMessage);
}

main();