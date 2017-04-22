'use strict';

import React, { Component } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';
import config from '../../../../config/config.json'


export default class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    this.iosClientId = config.iosClientId;
    this.state = {
      user: null,
    };

    GoogleSignin.configure({
      iosClientId: this.iosClientId,
    });

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    if (this.props.doSignOut) {
      this.signOut();
    } else {
      GoogleSignin.currentUserAsync().then((user) => {
        this.setState({ user: user });
        console.log('USER', user);
        if (user !== null) {
            this.props.onSignInComplete();
        }
      });
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
        console.log('USER', user);
        this.setState({ user: user });
        this.props.onSignInComplete((user !== null) ? true : false);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      });
  }

  signOut() {
    const user = GoogleSignin.currentUser();
    if (user !== null) {
      GoogleSignin.signOut()
        .then(() => {
          this.props.onSignOutComplete();
        })
        .catch((err) => {

        });
    }
  }
}
