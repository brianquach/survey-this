'use strict';

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Text,
  View
} from 'react-native';


class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: this.props.surveyQuestions
    };
  }

  render() {
    const {
      surveyTitle,
      closeResults,
    } = this.props;
    const headingMsg = `Results for ${surveyTitle}:`;

    return (
      <View>
        <Text>{ headingMsg }</Text>
        <Button
          onPress={ closeResults }
          title="Back"
          color="#841584"
          accessibilityLabel="Show survey result selection"
        />
      </View>
    );
  }
}

export default Results;
