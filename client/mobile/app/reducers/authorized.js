'use strict';

const initialState = {
    isAuthorized: false,
    name: '',
    email: '',
};

const authorized = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return Object.assign({}, state, {
        isAuthorized: true,
        name: action.name,
        email: action.email
      });
    case 'SIGNOUT':
      return initialState;
    default:
      return state;
  }
};

export default authorized;
