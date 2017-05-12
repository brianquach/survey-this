'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInComplete: (name, email) => {
      dispatch({
        type: 'SIGNIN',
        name: name,
        email: email
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
