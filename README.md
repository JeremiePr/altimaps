# altimaps

Display Google Maps altitude on Google Street View

## What is it?

AltiMaps is a Chrome Extension that runs on Google Street View.
Everytime a request is made by the client on Google Maps while navigating on Street View, the extension fetches the altitude, stored inside the response payload.
The altitude is then transferred to the client script that displays it onto the screen.

## Project Info

The project uses JavaScript and Jquery.
It contains several files:
* ```manifest.json```: Contains the extension metadata
* ```background.js```: Script that runs on extension runtime
* ```script.js```: Script that runs on Google Maps
* ```style.css```: Contains extension styling information

## Thanks

Thanks to you for finding this repo
