'use strict';

import React, { Component } from 'react';
import {
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';


class FacebookSignIn extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.signOut();
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
    const getAccessToken = this.getAccessToken;
    const getUserInformation = this.getUserInformation;
    const onSignInComplete = this.props.onSignInComplete;

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          getAccessToken();
          getUserInformation((error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              console.log('Success fetching data: ' + result, result, result.email);
              onSignInComplete(result.name, result.email);
            }
          });
        }
      },
      (error) => {
        alert('Login failed with error: ' + error);
      }
    );
  }

  async getAccessToken() {
    try {
      return await AccessToken.getCurrentAccessToken();
    }
    catch(err) {
      return err;
    }
  }

  getUserInformation(callback) {
    let graphRequestManager = new GraphRequestManager();
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,email', null, callback,
    );
    graphRequestManager.addRequest(infoRequest).start();
  }

  signOut() {
    LoginManager.logOut();
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authorized
  }
};

export default connect(mapStateToProps)(FacebookSignIn);
