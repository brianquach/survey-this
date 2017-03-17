'use strict';

import React, { Component } from 'react';
import {
  Alert,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

class SplashScreen extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            'Touch detected!!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )}>
          <View style={styles.splash}>
            <Text>Survey This</Text>
          </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  wrapper: {
    flex: 1,
  }
});

module.exports = SplashScreen;
