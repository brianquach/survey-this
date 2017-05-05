'use strict';

import React, { Component } from 'react';
import {
  Button,
  Picker,
  Text,
  TextInput,
  View,
} from 'react-native';


class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      question: '',
      answerType: 1,
      questions: [],
    };
  }

  render() {
    return (
      <View>
        <Text>
          Name:
        </Text>
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ (text) => this.setState({ name: text }) }
          value={ this.state.name } />
        <Text>
          Question:
        </Text>
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ (text) => this.setState({ question: text }) }
          value={ this.state.question } />
        <Text>
          Answer Type:
        </Text>
        <Picker
          selectedValue={ this.state.answerType }
          onValueChange={ (type) => this.setState({ answerType: type }) }>
          <Picker.Item label="Yes/No" value="1" />
        </Picker>
        <Button
          title="Add Question"
          accessibilityLabel="Add question to survey"
          onPress={ () => console.log('add question to survey') }
        />
        <Button
          title="Create Survey"
          accessibilityLabel="Finish creating survey"
          onPress={ () => console.log('create survey') }
        />
      </View>
    );
  }
}

export default CreateSurvey;
