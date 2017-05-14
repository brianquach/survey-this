'use strict';

import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { LoginManager } from 'react-native-fbsdk';
import { CONFIG } from '../../../../index';
import { Storage } from '../../../../lib/storage';

class SignOut extends Component {
  render() {
    return (
      <Button
        title="Logout"
        accessibilityLabel="Logout of Survey This app"
        onPress={() => { this.signOut(); }} />
    );
  }

  signOut() {
    const { dispatch } = this.props;
    LoginManager.logOut();
    Storage.removeItem('auth');
    dispatch({ type: 'SIGNOUT' });
  }
}

const mapStateToProps = (state) => {
  return {
    doSignOut: !state.authorized
  }
};

export default connect(mapStateToProps)(SignOut);
