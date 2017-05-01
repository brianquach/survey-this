const authorized = (state = false, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return true;
    case 'SIGNINOUT':
      return false;
    default:
      return state;
  }
};

export default authorized;
