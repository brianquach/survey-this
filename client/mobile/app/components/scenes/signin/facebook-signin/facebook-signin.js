'use strict';

import React, { Component } from 'react';
import {
  Button
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;


export default class FacebookSignIn extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.fbGraphRequestUserInformation = this.fbGraphRequestUserInformation.bind(this);
  }

  componentDidMount() {
    if (this.props.doSignOut) {
      this.signOut();
    } else {
      this.getUserInformation();
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
    const getUserInformation = this.getUserInformation;

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          getUserInformation();
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  getUserInformation() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          console.log(data.accessToken.toString());
          this.fbGraphRequestUserInformation();
          this.props.onSignInComplete();
        }
      }
    );
  }

  fbGraphRequestUserInformation() {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,email',
      null,
      (error: ?Object, result: ?Object) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log('Success fetching data: ' + result, result.data, result.email);
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  signOut() {
    LoginManager.logOut();
  }
}
