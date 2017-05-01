'use strict';

import React, { Component } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';
import { connect } from 'react-redux';
import { CONFIG } from '../../../../index';


class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    console.log('CONFIG', CONFIG);

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this._setupGoogleSignin();

    if (this.props.isLoggedIn) {
      const user = GoogleSignin.currentUser();
      if (user !== null) {
          this.props.onSignInComplete();
      }
    } else {
      this.signOut();
    }
  }

  render() {
    return (
      <GoogleSigninButton
        style={{ width: 230, height: 48 }}
        size={ GoogleSigninButton.Size.Standard }
        color={ GoogleSigninButton.Color.Light }
        onPress={ this.signIn } />
    )
  }

  signIn() {
    GoogleSignin.signIn()
      .then((user) => {
        this.props.onSignInComplete();
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      });
  }

  signOut() {
    const user = GoogleSignin.currentUser();
    if (user !== null) {
      GoogleSignin.signOut()
        .then((d) => {
        })
        .catch((err) => {
          console.log('ERR', err);
        });
    }
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
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authorized
  }
};

export default connect(mapStateToProps)(GoogleSignIn);
