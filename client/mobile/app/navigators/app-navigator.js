import { StackNavigator } from 'react-navigation';
import Dashboard from '../components/scenes/dashboard';
import SignIn from '../components/scenes/signin';
import CreateSurvey from '../components/scenes/create-survey';
import RunSurvey from '../components/scenes/run-survey';
import SurveyAnalytics from '../components/scenes/analytics';


export const AppNavigator = StackNavigator({
  SignIn: { screen: SignIn },
  Dashboard: { screen: Dashboard },
  CreateSurvey: { screen: CreateSurvey },
  RunSurvey: { screen: RunSurvey },
  SurveyAnalytics: { screen: SurveyAnalytics },
});
