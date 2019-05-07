const signUp = (username, email, password) => ({
  type: 'SIGN_UP',
  username,
  email,
  password,
});

export default signUp;
