const handleError = res => {
  if (!res.ok) {
    return Promise.reject();
  }
  return res;
};

const request = (endpoint, method, body) => {
  return fetch(endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  }).then(handleError);
};

export default request;