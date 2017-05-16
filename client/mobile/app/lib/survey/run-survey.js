'use strict';

import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';


module.exports.SurveyRun = (() => {
  class SceneController {
    constructor(questions, runCount, renderer, onFinish) {
      this.scenes = [];
      this.runCount = runCount;
      this.currentSceneIndex = 0;
      this.renderer = renderer;
      this.onFinish = onFinish;

      questions.forEach((question) => {
        this.scenes.push(
          <QuestionScene questionText={ question.Question } />
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
          this.onFinish();
        }
      }
    }
  }

  class QuestionScene extends Component {
    render() {
      const questionText = this.props.questionText;
      return (
        <View>
          <Text>{ questionText }</Text>
          <Button
            title="Yes"
            onPress={ () => response(true) }
          />
          <Button
            title="No"
            onPress={ () => response(false) }
          />
        </View>
      );
    }
  }

  let tracker;

  function init(survey, runCount, questionSceneRenderer, onFinish) {
    tracker = new SceneController(survey.Questions, runCount, questionSceneRenderer, onFinish);
  }

  function start() {
    tracker.start();
  }

  function response(answer) {
    // Save resonse
    tracker.renderNextQuestion();
  }

  return {
    init: init,
    start: start
  };
})();
