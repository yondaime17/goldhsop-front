// Function to save the token to local storage
export const saveToken = (token, userId) => {
  localStorage.setItem("token", token);
};

// Function to retrieve the token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem("token");
};
