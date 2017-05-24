'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { SurveyRestAPI } from '../../../lib/rest-api';
import RunCountModal from './run-count-modal';
import { SurveyLib } from '../../../lib/survey';


class RunSurvey extends Component {
  state = {
    surveys: [],
    selectedSurvey: {},
    showRunCountModal: false,
    isRunning: false
  }

  constructor(props) {
    super();

    this.selectSurvey = this.selectSurvey.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.runSurvey = this.runSurvey.bind(this);
  }

  componentWillMount() {
    const params = {
      email: this.props.email
    };
    SurveyRestAPI.getSurveys(params, (surveys) => {
      this.setState({
        surveys: surveys,
      });
    });
  }

  render() {
    const surveys = this.state.surveys;
    const showRunCountModal = this.state.showRunCountModal;
    const isRunning = this.state.isRunning;

    return (
      <View>
        { !isRunning ? (
          <View>
            <Text>Pick survey to run:</Text>
            <FlatList
              data={ surveys }
              renderItem={ ({item}) =>
                <Text
                  style={{ lineHeight: 40 }}
                  onPress={ () => this.selectSurvey(item) }>
                  { item.Title }
                </Text>
              }
              keyExtractor={ (item, index) => index }
            />
          </View>
        ) : (
          this.state.currentQuestionScene
        )}
        <RunCountModal
          show={ showRunCountModal }
          setModalVisible={ this.setModalVisible }
          survey={ this.state.selectedSurvey }
          onRun={ this.runSurvey }
        />
      </View>
    )
  }

  selectSurvey(survey) {
    this.setState({
      selectedSurvey: survey
    });
    this.setModalVisible(true);
  }

  runSurvey(resultSetName, runCount) {
    const survey = this.state.selectedSurvey;

    this.setState({
      isRunning: true
    });

    SurveyLib.Run.init(
      survey.Questions,
      resultSetName,
      parseInt(runCount),
      (questionScene) => {
        this.setState({ currentQuestionScene: questionScene });
      },
      (resultSetName, surveyResults) => {
        console.log(survey);
        const params = {
          resultSetName: resultSetName,
          surveyId: survey.Id,
          surveyTitle: survey.Title,
          surveyResults: surveyResults
        };
        SurveyRestAPI.saveSurveyResponse(params);
        this.props.goToDashboard();
      }
    );
    SurveyLib.Run.start();
  }

  setModalVisible(isVisible) {
    this.setState({ showRunCountModal: isVisible });
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToDashboard: () => dispatch({ type: 'DASHBOARD' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunSurvey);
