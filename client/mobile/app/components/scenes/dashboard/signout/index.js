'use strict';

import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { LoginManager } from 'react-native-fbsdk';
import { CONFIG } from '../../../../index';


class SignOut extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Button
        title="Logout"
        accessibilityLabel="Logout of Survey This app"
        onPress={() => { this.signOut(); }} />
    );
  }

  signOut() {
    LoginManager.logOut();
    dispatch({ type: 'SIGNOUT' });
  }
}

const mapStateToProps = (state) => {
  return {
    doSignOut: !state.authorized
  }
};

export default connect(mapStateToProps)(SignOut);
