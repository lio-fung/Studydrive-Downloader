// Function to inject a script into the webpage
function injectScript (src) {
    const s = document.createElement('script'); // Create a new script element
    s.src = chrome.runtime.getURL(src); // Set the source to the extension's resource URL
    s.onload = () => s.remove(); // Remove the script element after it has loaded
    (document.head || document.documentElement).append(s); // Append the script to the head or root of the document
}

// Inject the 'inject.js' script into the webpage
injectScript('inject.js');