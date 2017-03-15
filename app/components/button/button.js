'use strict';

import React, { Component } from 'react';
import {
  Button
} from 'react-native';

export default class SurveyThisButton extends Component {
  render() {
    return (
      <Button
          disabled
          title='Test Button'
          accessibilityLabel='This is a custom test button'
        />
    );
  }
}

AppRegistry.registerComponent('SurveyThisButton', () => SurveyThisButton);
