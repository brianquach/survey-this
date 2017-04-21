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
      <View style={styles.layout}>
        <SplashScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

AppRegistry.registerComponent('SurveyThis', () => SurveyThisApp);
