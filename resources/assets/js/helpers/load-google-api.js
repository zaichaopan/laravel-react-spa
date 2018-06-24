const CALLBACK_NAME = '__googleApiOnLoadCallback';

let promise = null;

export default function () {
  if (!promise) {
    promise = new Promise(function (resolve, reject) {
      var timeoutId = setTimeout(function () {
        window[CALLBACK_NAME] = function () { }; // Set the on load callback to a no-op
        reject(new Error('Could not load the Google API'));
      }, 10000);

      // Hook up the on load callback
      window[CALLBACK_NAME] = function () {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        resolve(window.gapi);
        delete window[CALLBACK_NAME];
      };

      // Prepare the `script` tag to be inserted into the page
      var scriptElement = document.createElement('script');

      scriptElement.src = 'https://apis.google.com/js/platform.js?onload=' + CALLBACK_NAME;

      // Insert the `script` tag
      document.body.appendChild(scriptElement);
    });
  }

  return promise;
}
