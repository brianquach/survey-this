'use strict';

import React, { Component } from 'react';
import {
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux'
import GoogleSignIn from './google-signin';
import FacebookSignIn from './facebook-signin';


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doSignOut: false,
    };

    this.dispatch = this.props.dispatch;

    this.onSignInComplete = this.onSignInComplete.bind(this);
    this.signOut = this.signOut.bind(this);
    this.onSignOutComplete = this.onSignOutComplete.bind(this);
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
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
    this.dispatch({ type: 'SIGNOUT' });
    this.setState({ doSignOut: true });
  }

  onSignInComplete() {
    this.dispatch({ type: 'SIGNIN' });
  }

  onSignOutComplete() {
    this.setState({ doSignOut: false });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.signin
  }
}

export default connect(mapStateToProps, null)(SignIn);
