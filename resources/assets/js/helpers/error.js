export const destructServerErrors = error => {
  if (error.response && error.response.data && error.response.data.errors) {
    return error.response.data.errors;
  }

  return '';
};

export const hasError = (errors, field) => {
  return !window._.isEmpty(errors[field]);
};

export const getError = (errors, field) => {
  let [error] = errors[field];
  return error;
};
