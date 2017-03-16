'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

let SplashScreen = require('./components/splash-screen/splash-screen');

export default class SurveyThisApp extends Component {
  render() {
    return (
      <SplashScreen />
    );
  }
}

AppRegistry.registerComponent('SurveyThis', () => SurveyThisApp);
