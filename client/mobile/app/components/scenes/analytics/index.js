'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { SurveyRestAPI } from '../../../lib/rest-api';
import Results from './results';


class SurveyAnalytics extends Component {
  constructor(props) {
    super();

    this.state = {
      surveys: [],
      showResults: false,
      selectedSurvey: {}
    }

    this.closeResults = this.closeResults.bind(this);
  }

  componentWillMount() {
    const params = {
      email: this.props.email
    };
    SurveyRestAPI.getSurveys(params, (surveys) => {
      this.setState({ surveys });
    });
  }

  render() {
    const surveys = this.state.surveys;
    const showResults = this.state.showResults;
    const selectedSurvey = this.state.selectedSurvey;

    return (
      <View>
      {!showResults ? (
        <View>
          <Text>Select survey to see results:</Text>
          <FlatList
            data={ surveys }
            renderItem={ ({item}) =>
              <TouchableHighlight onPress={ () => this.displaySurveyResults(item) }>
                <Text>{ item.Title }</Text>
              </TouchableHighlight>
            }
            keyExtractor={ (item, index) => index }
          />
        </View>
      ) : (
        <Results
          surveyTitle={ selectedSurvey.Title }
          surveyQuestions={ selectedSurvey.Questions }
          closeResults={ this.closeResults }
        />
      )}
      </View>
    );
  }

  displaySurveyResults(selectedSurvey) {
    this.setState({
      selectedSurvey,
      showResults: true
    });
  }

  closeResults() {
    this.setState({ showResults: false });
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

export default connect(mapStateToProps)(SurveyAnalytics);
