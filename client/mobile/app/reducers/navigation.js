import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/app-navigator';


const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('SignIn'));

const nav = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case 'SIGNIN':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Dashboard' }), state);
      break;
    case 'SIGNOUT':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SignIn' }), state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState;
};

export default nav;
