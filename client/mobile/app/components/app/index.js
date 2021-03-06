'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from '../../navigators/app-navigator';


class App extends Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={
        addNavigationHelpers({ dispatch, state: nav })
      } />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
