'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import FacebookSignIn from './facebook-signin';


class SignIn extends Component {
  render() {
    const { onSignInComplete } = this.props;
    return (
      <View>
        <FacebookSignIn
          onSignInComplete={ onSignInComplete } />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignInComplete: (name, email) => {
      ownProps.navigation.dispatch({
        type: 'SIGNIN',
        name: name,
        email: email
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
