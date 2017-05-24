'use strict';

import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';


module.exports.SurveyRun = (() => {
  class QuestionScene extends Component {
    render() {
      const questionId = this.props.id;
      const questionText = this.props.text;
      return (
        <View>
          <Text>{ questionText }</Text>
          <Button
            title="Yes"
            onPress={ () => this.response(questionId, true) }
          />
          <Button
            title="No"
            onPress={ () => this.response(questionId, false) }
          />
        </View>
      );
    }

    response(questionId, answer) {
      this.props.surveyResponseRecorder.recordResponse(questionId, answer);
      this.props.renderNextQuestion();
    }
  }

  class SurveyResponseRecorder {
    constructor(resultSetName) {
      this.resultSetName = resultSetName;
      this.results = {};
    }

    recordResponse(id, answer) {
      if (typeof this.results[id] === 'undefined') {
        this.results[id] = {
          "Yes": 0,
          "No": 0
        }
      }
      var answerKey = (answer) ? 'Yes' : 'No';
      this.results[id][answerKey] += 1;
    }
  }

  class SceneController {
    constructor(questions, runCount, renderer, surveyResponseRecorder, onFinish) {
      this.scenes = [];
      this.runCount = runCount;
      this.currentSceneIndex = 0;
      this.renderer = renderer;
      this.onFinish = onFinish;
      this.surveyResponseRecorder = surveyResponseRecorder;
      this.renderNextQuestion = this.renderNextQuestion.bind(this);

      questions.forEach((question) => {
        this.scenes.push(
          <QuestionScene
            id={ question.Id }
            text={ question.Question }
            surveyResponseRecorder={ this.surveyResponseRecorder }
            renderNextQuestion={ this.renderNextQuestion }
          />
        );
      });
    }

    start() {
      this.renderScene(0);
    }

    restart() {
      this.currentSceneIndex = 0;
      this.renderScene(this.currentSceneIndex);
    }

    renderScene(sceneIndex=0) {
      this.renderer(this.scenes[sceneIndex]);
    }

    renderNextQuestion() {
      this.currentSceneIndex += 1;
      if (this.scenes.length > this.currentSceneIndex) {
        this.renderScene(this.currentSceneIndex);
      } else {
        this.runCount -= 1;
        if (this.runCount > 0) {
          this.restart();
        } else {
          this.onFinish(
            this.surveyResponseRecorder.resultSetName,
            this.surveyResponseRecorder.results
          );
        }
      }
    }
  }

  let tracker;

  function init(surveyQuestions, resultSetName, runCount, questionSceneRenderer, onFinish) {
    const surveyResponseRecorder = new SurveyResponseRecorder(resultSetName);
    tracker = new SceneController(surveyQuestions, runCount, questionSceneRenderer, surveyResponseRecorder, onFinish);
  }

  function start() {
    tracker.start();
  }

  return {
    init: init,
    start: start
  };
})();
