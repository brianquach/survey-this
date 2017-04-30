'use strict';

import React, { Component } from 'react';
import {
  Button,
  View
} from 'react-native';


class Dashboard extends Component {
  render() {
    return (
      <Button
        title="Create Survey"
        accessibilityLabel="Start creating your own survey" />
      <Button
        title="Run Survey"
        accessibilityLabel="Run a survey you have created" />
      <Button
        text="Analytics"
        accessibilityLabel="View analytical information of your surveys" />
    );
  }
}

export default Dashboard;
