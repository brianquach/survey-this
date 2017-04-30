import { StackNavigator } from 'react-navigation';
import SignIn from '../components/scenes/signin';


export const AppNavigator = StackNavigator({
  SignIn: { screen: SignIn }
});
