export const validateUsername = function (username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const validateEmail = function (email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const validatePassword = function (password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/.test(
    password
  );
};
