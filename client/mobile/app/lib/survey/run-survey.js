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
    constructor(id) {
      this.id = id;
      this.response = {};
    }

    recordResponse(id, answer) {
      if (typeof this.response[id] === 'undefined') {
        this.response[id] = {
          "Yes": 0,
          "No": 0
        }
      }
      var answerKey = (answer) ? 'Yes' : 'No';
      this.response[id][answerKey] += 1;
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
          console.log(this.surveyResponseRecorder.response);
          this.onFinish();
        }
      }
    }
  }

  let tracker;

  function init(survey, runCount, questionSceneRenderer, onFinish) {
    const surveyResponseRecorder = new SurveyResponseRecorder(survey.id);
    tracker = new SceneController(survey.Questions, runCount, questionSceneRenderer, surveyResponseRecorder, onFinish);
  }

  function start() {
    tracker.start();
  }

  return {
    init: init,
    start: start
  };
})();
