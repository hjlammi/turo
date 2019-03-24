const logIn = (state = false, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return false;
    case 'LOG_IN_SUCCESS':
      return true;
    default:
      return state;
  }
};

export default logIn;
