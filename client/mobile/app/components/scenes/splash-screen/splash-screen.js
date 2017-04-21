'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import styles from './styles';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    console.log(1, this.props);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start(() => {
      console.log(2, this.props);
      this.props.onComplete();
    });
  }

  render() {
    return (
      <Animated.View style={[
        styles.splash,
        { opacity: this.state.fadeAnim }
      ]}>
        <Text>Survey This</Text>
      </Animated.View>
    );
  }
}
