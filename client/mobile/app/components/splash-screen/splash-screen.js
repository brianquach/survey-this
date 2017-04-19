'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import styles from './styles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      hide: false
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start(
      () => {
        this.setState({ hide: true })
      });
  }

  render() {
    let animatedView = (!this.state.hide) ? (
      <Animated.View style={[
        styles.splash,
        { opacity: this.state.fadeAnim }
      ]}>
        <Text>Survey This</Text>
      </Animated.View>
    ) : null;
    return animatedView;
  }
}

module.exports = SplashScreen;
