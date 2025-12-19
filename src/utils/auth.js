export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const login = (token) => {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("auth-change"));
};

export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth-change"));
};
