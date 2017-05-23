'use strict';

import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import SignOut from './signout';


class Dashboard extends Component {
  render() {
    const {
      goToCreateSurvey,
      goToRunSurvey,
      name
    } = this.props;

    const welcomeMsg = `Welcome to your dashboard, ${name}!`;

    return (
      <View>
        <Text>{ welcomeMsg }</Text>
        <Button
          title="Create Survey"
          accessibilityLabel="Start creating your own survey"
          onPress={ goToCreateSurvey } />
        <Button
          title="Run Survey"
          accessibilityLabel="Run a survey you have created"
          onPress={ goToRunSurvey } />
        <Button
          title="Analytics"
          accessibilityLabel="View analytical information of your surveys"
          onPress={() => { console.log('analytics'); }} />
        <SignOut />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.authorized.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToCreateSurvey: () => dispatch({ type: 'CREATE_SURVEY' }),
    goToRunSurvey: () => dispatch({ type: 'RUN_SURVEY' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
