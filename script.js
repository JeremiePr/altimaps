document.body.innerHTML += `<div id="am-altitude-container"><p></p></div>`;

const setAltitude = altitude => {
	document.querySelector("#am-altitude-container > p").innerHTML = `${altitude}m`;
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if(message.origin && message.value && message.origin === "AltiMaps") {
		setAltitude(message.value);
	}
});