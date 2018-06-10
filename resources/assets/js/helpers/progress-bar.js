import NProgress from 'nprogress';

export default (instance) => {
  let requestsCounter = 0;

  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      if (config.method === 'get') {
        requestsCounter++;
        NProgress.start();
      }
      return config;
    });
  };

  const setupStopProgress = () => {
    const responseFunc = response => {
      if ((--requestsCounter) === 0) {
        NProgress.done();
      }
      return response;
    };

    const errorFunc = error => {
      if ((--requestsCounter) === 0) {
        NProgress.done();
      }
      return Promise.reject(error);
    };

    instance.interceptors.response.use(responseFunc, errorFunc);
  };

  setupStartProgress();
  setupStopProgress();
};
