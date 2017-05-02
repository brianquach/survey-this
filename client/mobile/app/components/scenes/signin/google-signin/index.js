'use strict';

import React, { Component } from 'react';
import { Button } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { connect } from 'react-redux';
import { CONFIG } from '../../../../index';


class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    this.manager = new OAuthManager('Google');
    this.manager.configure({
      google: {
        callback_url: 'com.googleusercontent.apps.1009267532183-a580ir1vu23hnp29mr81s56mju8naboa:/google',
        client_id: '1009267532183-a580ir1vu23hnp29mr81s56mju8naboa.apps.googleusercontent.com',
      }
    });
    this.signIn = this.signIn.bind(this);
  }

  render() {
    return (
      <Button
        title="Google"
        style={{ width: 230, height: 48 }}
        onPress={ this.signIn } />
    )
  }

  signIn() {
    this.manager.authorize('google', { scopes: 'profile+email' })
      .then((resp) => {
        console.log('BQ: Your users ID');
        this.props.onSignInComplete();
      })
      .catch(err => console.log('BQ: There was an error'));;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authorized
  }
};

export default connect(mapStateToProps)(GoogleSignIn);
