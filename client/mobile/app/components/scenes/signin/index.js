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
    this.signOut = this.signOut.bind(this);
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const doSignOut = this.state.doSignOut;
    return (
      <View>
        { !isLoggedIn ? (
          <View>
            <GoogleSignIn
              doSignOut={ doSignOut } />
            <FacebookSignIn
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
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.signin
  }
};

export default connect(mapStateToProps, null)(SignIn);
