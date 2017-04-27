'use strict';

import React, { Component } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';
import { CONFIG } from '../../../../index'


export default class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    console.log('CONFIG', CONFIG);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this._setupGoogleSignin();

    if (this.props.doSignOut) {
      this.signOut();
    } else {
      const user = await GoogleSignin.currentUserAsync();
      if (user !== null) {
          this.props.onSignInComplete();
      }
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
          this.props.onSignOutComplete();
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
