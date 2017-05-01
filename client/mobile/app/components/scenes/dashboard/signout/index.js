'use strict';

import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { CONFIG } from '../../../../index';


class SignOut extends Component {
  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    const { dispatch } = this.props;
    return (
      <Button
        title="Logout"
        accessibilityLabel="Logout of Survey This app"
        onPress={() => { this.signOut(); }} />
    );
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.configure({
        iosClientId: CONFIG.iosClientId,
        offlineAccess: false
      });
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  signOut() {
    const { dispatch } = this.props;
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
     this.setState({user: null});
    })
   .done(() => dispatch({ type: 'SIGNOUT' }));
   
   LoginManager.logOut();
  }
}

const mapStateToProps = (state) => {
  return {
    doSignOut: !state.authorized
  }
};

export default connect(mapStateToProps)(SignOut);
