'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { SurveyRestAPI } from '../../../restful-api/survey';
import RunCountModal from './run-count-modal';


class RunSurvey extends Component {
  state = {
    surveys: [],
    selectedSurvey: {},
    showRunCountModal: false
  }

  constructor(props) {
    super();

    this.selectSurvey = this.selectSurvey.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
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

    return (
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
    this.setState({ selectedSurvey: survey });
    this.setModalVisible(true);
  }

  runSurvey(runCount) {
    console.log('run', parseInt(runCount));
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

export default connect(mapStateToProps)(RunSurvey);
