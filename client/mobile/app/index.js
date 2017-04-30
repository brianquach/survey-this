'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app'
import appReducers from './reducers'
import CONFIG from './config/config.json'


class SurveyThisApp extends Component {
  constructor(props) {
      super(props);

      this.store = createStore(appReducers);
  }

  render() {
    return (
      <Provider store={ this.store }>
        <App />
      </Provider>
    );
  }
}

module.exports.CONFIG = CONFIG;

AppRegistry.registerComponent('SurveyThis', () => SurveyThisApp);
