'use strict';

import React, { Component } from 'react';
import {
  View,
  Button,
} from 'react-native';
import GoogleSignIn from '../google-signin/google-signin';


export default class SocialMediaSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      doSignOut: false,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.onSignOutComplete = this.onSignOutComplete.bind(this);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const doSignOut = this.state.doSignOut;
    return (
      <View>
        { !isLoggedIn ? (
          <GoogleSignIn
            onUserLogin={ this.signIn }
            onSignOutComplete={ this.onSignOutComplete }
            doSignOut={ doSignOut } />
        ) : (
          <Button
            title="Sign Out"
            accessibilityLabel="Sign out"
            onPress={ this.signOut }
          />
        )}
      </View>
    )
  }

  signIn(isSuccessful) {
    this.setState({ isLoggedIn: isSuccessful });
  }

  signOut() {
    this.setState({ doSignOut: true, isLoggedIn: false });
  }

  onSignOutComplete() {
    this.setState({ doSignOut: false });
  }
}
