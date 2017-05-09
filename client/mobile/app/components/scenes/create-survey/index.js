'use strict';

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Picker,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';


class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answerType: 1,
      questions: [],
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.createSurvey = this.createSurvey.bind(this);
  }

  render() {
    return (
      <View>
        <Text>
          Survey Title:
        </Text>
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ (text) => this.setState({ title: text }) }
          value={ this.state.title } />
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
          onPress={ this.addQuestion } />
        <Button
          title="Create Survey"
          accessibilityLabel="Finish creating survey"
          onPress={ this.createSurvey } />
        <Text>
          Questions:
        </Text>
        <FlatList
          data={ this.state.questions }
          renderItem={ ({item}) => <Text>{ item.Question }</Text> }
          keyExtractor={ (item, index) => index } />
      </View>
    );
  }

  addQuestion() {
    this.setState({
        questions: [
          ...this.state.questions,
          {
            Question: this.state.question,
            AnswerType: this.state.answerType
          }
        ]
    });
    this.state.question = '';
  }

  createSurvey() {
    const creator = this.props.email;
    const url = 'http://localhost:3000/survey';
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        Title: this.state.title,
        Creator: creator,
        Questions: this.state.questions
      })
    })
    .then((resp) => resp.json())
    .then((respJSON) => {
      const isSuccessful = respJSON.IsSuccessful;
      console.log(isSuccessful);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

export default connect(mapStateToProps)(CreateSurvey);
