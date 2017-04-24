'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} from 'react-native';
import SplashScreen from './components/scenes/splash-screen/splash-screen';
import SignIn from './components/scenes/signin/signin';
import CONFIG from './config/config.json'


export default class SurveyThisApp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        routes: [
          {
            title: 'splash',
            scene: <SplashScreen />,
          },
          {
            title: 'signin',
            scene: <SignIn />,
          },
        ]
      }

      this.renderScene = this.renderScene.bind(this);
  }

  render() {
    const routes = this.state.routes;
    return (
      <Navigator
        initialRoute={ routes[0] }
        initialRouteStack={ routes }
        renderScene={ this.renderScene }
        style={ styles.layout }
      />
    );
  }

  renderScene(route, navigator) {
    switch (route.title) {
      case 'splash':
        const login = this.state.routes[1];
        const renderSceneLogin = () => { navigator.push(login); }
        return (
          <SplashScreen
            onComplete={ renderSceneLogin }
            />
        );
      case 'signin':
        return (
          <SignIn />
        )
      default:
        break;
    }
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

module.exports.CONFIG = CONFIG;

AppRegistry.registerComponent('SurveyThis', () => SurveyThisApp);
