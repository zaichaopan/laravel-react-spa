const CALLBACK_NAME = '__googleApiOnLoadCallback';

let promise = null;

export default () => {
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        window[CALLBACK_NAME] = () => { };
        reject(new Error('Could not load the Google API'));
      }, 10000);

      window[CALLBACK_NAME] = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        resolve(window.gapi);
        delete window[CALLBACK_NAME];
      };

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://apis.google.com/js/platform.js?onload=' + CALLBACK_NAME;
      document.body.appendChild(scriptElement);
    });
  }

  return promise;
};
