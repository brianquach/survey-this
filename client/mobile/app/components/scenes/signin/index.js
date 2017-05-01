'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import GoogleSignIn from './google-signin';
import FacebookSignIn from './facebook-signin';


class SignIn extends Component {
  render() {
    const { onSignInComplete } = this.props;
    return (
      <View>
        <GoogleSignIn
          onSignInComplete={ onSignInComplete } />
        <FacebookSignIn
          onSignInComplete={ onSignInComplete } />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignInComplete: () => {
      ownProps.navigation.dispatch({ type: 'SIGNIN' });
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
