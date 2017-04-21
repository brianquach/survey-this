'use strict';

import React, { Component } from 'react';
import {
  Button
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;


export default class FacebookSignIn extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    if (this.props.doSignOut) {
      this.signOut();
    } else {
      console.log('OKAY');
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          if (data) {
            alert(data.accessToken.toString())
            this.props.onSignInComplete();
          }
        }
      );
    }
  }

  render() {
    return (
        <Button
          title="FACE BOOK"
          onPress={ this.signIn } />
    )
  }

  signIn() {
    const onSignInComplete = this.props.onSignInComplete;

    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              alert(data.accessToken.toString())
            }
          );
          onSignInComplete(true);
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  signOut() {
    LoginManager.logOut();
  }
}
