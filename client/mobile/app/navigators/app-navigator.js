import { StackNavigator } from 'react-navigation';
import Dashboard from '../components/scenes/dashboard';
import SignIn from '../components/scenes/signin';


export const AppNavigator = StackNavigator({
  SignIn: { screen: SignIn },
  Dashboard: { screen: Dashboard },
});
