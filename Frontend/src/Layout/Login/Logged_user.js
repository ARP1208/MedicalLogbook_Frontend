let loginResponse = {};

// Load login response from local storage if available
const storedLoginResponse = localStorage.getItem('loginResponse');
if (storedLoginResponse) {
  loginResponse = JSON.parse(storedLoginResponse);
}

export const setLoginResponse = (responseData) => {
  loginResponse = responseData;
  localStorage.setItem('loginResponse', JSON.stringify(responseData));
};

export const getLoginResponse = () => {
  return loginResponse;
};