'use strict';

import React, { Component } from 'react';
import {
  View,
  Button,
} from 'react-native';
import GoogleSignIn from './google-signin/google-signin';
import FacebookSignIn from './facebook-signin/facebook-signin';


export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      doSignOut: false,
    };

    this.onSignInComplete = this.onSignInComplete.bind(this);
    this.signOut = this.signOut.bind(this);
    this.onSignOutComplete = this.onSignOutComplete.bind(this);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const doSignOut = this.state.doSignOut;
    return (
      <View>
        { !isLoggedIn ? (
          <View>
            <GoogleSignIn
              onSignInComplete={ this.onSignInComplete }
              onSignOutComplete={ this.onSignOutComplete }
              doSignOut={ doSignOut } />
            <FacebookSignIn
              onSignInComplete={ this.onSignInComplete }
              onSignOutComplete={ this.onSignOutComplete }
              doSignOut={ doSignOut } />
          </View>
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

  signOut() {
    this.setState({ doSignOut: true, isLoggedIn: false });
  }
  
  onSignInComplete() {
    this.setState({ isLoggedIn: true });
  }

  onSignOutComplete() {
    this.setState({ doSignOut: false });
  }
}
