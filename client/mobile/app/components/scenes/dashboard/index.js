'use strict';

import React, { Component } from 'react';
import {
  Button,
  View
} from 'react-native';
import { connect } from 'react-redux';


class Dashboard extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <View>
        <Button
          title="Create Survey"
          accessibilityLabel="Start creating your own survey"
          onPress={() => { console.log('create'); }} />
        <Button
          title="Run Survey"
          accessibilityLabel="Run a survey you have created"
          onPress={() => { console.log('run'); }} />
        <Button
          title="Analytics"
          accessibilityLabel="View analytical information of your surveys"
          onPress={() => { console.log('analytics'); }} />
        <Button
          title="Logout"
          accessibilityLabel="Logout of Survey This app"
          onPress={() => { dispatch({ type: 'SIGNOUT' }) }} />
      </View>
    );
  }
}


export default connect()(Dashboard);
