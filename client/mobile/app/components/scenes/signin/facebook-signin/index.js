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

    this.getUserInformation = this.getUserInformation.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getUserInformation().then(
        () => {
          this.props.onSignInComplete();
        }
      );
    } else {
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
    const getUserInformation = this.getUserInformation;
    const onSignInComplete = this.props.onSignInComplete;

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          getUserInformation().then(
            () => {
              onSignInComplete();
            }
          );
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  async getUserInformation() {
    let r;
    try {
      r = await AccessToken.getCurrentAccessToken().then(
        (data) => {
          if (data) {
            console.log(data.accessToken.toString());
            this.fbGraphRequestUserInformation();
            return true;
          }
          return false;
        }
      );
    }
    catch(err) {
    }
    return r;
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authorized
  }
};

export default connect(mapStateToProps)(FacebookSignIn);
