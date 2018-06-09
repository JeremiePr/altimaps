/**
 * script.js
 * created on 06/08/2018
 * by Jeremie Primas
 */


let htmlInjected = false;

/**
 * Function that injects the altitude value in the DOM container element
 * @param altitude formatted altitude to inject in the DOM 
 */
function setAltitude(altitude) {
    if(htmlInjected) {
        document.querySelector("#am-altitude").innerHTML = `${altitude}m`;
    }
    else {
        let refNode = document.querySelector("#fineprint-terms");
        if(refNode !== null) {
            refNode.insertAdjacentHTML("afterEnd", `<p id="am-altitude" class="fineprint-item fineprint-padded noprint"></p>`);
            htmlInjected = true;
        }
    }
}

/**
 * Function that removes the container that displays the altitude
 */
function removeAltitude() {
    let node = document.querySelector("#am-altitude");
    if(node !== null) {
        node.remove();
        htmlInjected = false;
    }
}

/**
 * Function called on message received by the extension
 * @param message sent by the extension
 * @param sender identifies the message sender
 * @param sendResponse callback to notify the extension
 */
function onMessage(message, sender, sendResponse) {
	if(message.mode && message.value && message.mode === "Street_View") {
        setAltitude(message.value);
        sendResponse("Street View");
	}
	else {
        removeAltitude();
        sendResponse("Maps");
    }
}

/**
 * Entry function
 */
function main() {
	// Create a listener that trigger a callback function on message received
    chrome.runtime.onMessage.addListener(onMessage);
}

main();