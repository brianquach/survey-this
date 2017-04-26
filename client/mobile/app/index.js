'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './components/app'
import CONFIG from './config/config.json'


export default class SurveyThisApp extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <App />
    );
  }
}

module.exports.CONFIG = CONFIG;

AppRegistry.registerComponent('SurveyThis', () => SurveyThisApp);
