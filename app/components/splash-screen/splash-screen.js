'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.splash}>
        <Text>Survey This</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  }
});

module.exports = SplashScreen;
