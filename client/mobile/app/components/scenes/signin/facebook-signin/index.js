'use strict';

import React, { Component } from 'react';
import {
  Button,
} from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { Storage } from '../../../../lib/storage'


class FacebookSignIn extends Component {
  constructor(props) {
    super();
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this.getAccessToken().then(
      (resp) => {
        if (resp === null) {
          throw 'No access token';
        }
      }
    ).catch(
      (reason) => {
        console.log(reason);
      }
    ).then(
      () => {
        Storage.getItem('auth').then((auth) => {
          if (auth !== null) {
            this.props.onSignInComplete(auth.name, auth.email);
          }
        });
      }
    );
  }

  render() {
    return (
        <Button
          title="FACE BOOK"
          onPress={ this.signIn } />
    )
  }

  signIn() {
    this.getAccessToken().then(
      (resp) => {
        if (resp === null) {

        }
      }
    ).catch(reason => {
      console.error(reason);
      }
    ).then(
      () => {
        Storage.getItem('auth').then((auth) => {
          if (auth !== null) {
            this.props.onSignInComplete(auth.name, auth.email);
          } else {
            this.requestAccess();
          }
        });
      },
      () => {
        this.requestAccess();
      }
    );
  }

  requestAccess() {
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
              Storage.setItem('auth', {
                name: result.name,
                email: result.email
              });
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
}

export default FacebookSignIn;
