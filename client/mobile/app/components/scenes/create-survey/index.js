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
import { SurveyRestAPI } from '../../../restful-api/survey';


class CreateSurvey extends Component {
  constructor(props) {
    super();

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
    const params = {
      email: this.props.email,
      questions: this.state.questions,
      title: this.state.title
    }
    SurveyRestAPI.createSurvey(params, (resp) => {
      const isSuccessful = resp.isSuccessful;
      console.log(isSuccessful);
      this.props.onSurveyCreate();
    });
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSurveyCreate: () => {
      dispatch({
        type: 'DASHBOARD'
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);
