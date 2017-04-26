'use strict';

import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
} from 'react-native';
import SplashScreen from '../scenes/splash-screen';
import SignIn from '../scenes/signin';


export default class App extends Component {
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
