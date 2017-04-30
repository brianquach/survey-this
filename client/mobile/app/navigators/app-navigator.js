import { StackNavigator } from 'react-navigation';
import SplashScreen from '../components/scenes/splash-screen';
import SignIn from '../components/scenes/signin';


export const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignIn }
});
