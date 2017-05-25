'use strict';

import React, { Component } from 'react';
import {
  SectionList,
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
      results: [],
      showResults: false,
      selectedResultSet: {}
    }

    this.closeResults = this.closeResults.bind(this);
  }

  componentWillMount() {
    const params = {
      creator: this.props.email
    };
    SurveyRestAPI.getSurveyResults(params, (results) => {
      this.setState({ results });
    });
  }

  render() {
    const showResults = this.state.showResults;
    const selectedResultSet = this.state.selectedResultSet;

    const resultGroup = {};
    this.state.results.map((result, index) => {
      if (!resultGroup.hasOwnProperty(result.SurveyTitle)) {
        resultGroup[result.SurveyTitle] = [];
      }
      resultGroup[result.SurveyTitle].push({
        resultSetName: result.ResultSetName,
        results: result.Results,
        surveyTitle: result.SurveyTitle,
        key: index
      });
    });
    const data = [];
    for (const r in resultGroup) {
      if (resultGroup.hasOwnProperty(r)) {
        data.push({
          data: resultGroup[r],
          key: r
        })
      }
    }

    return (
      <View>
      {!showResults ? (
        <View>
          <Text>Select result data set:</Text>
          <SectionList
            renderItem={ ({item}) =>
              <TouchableHighlight onPress={ () => this.displaySurveyResults(item) }>
                <Text>{ item.resultSetName }</Text>
              </TouchableHighlight>
            }
            renderSectionHeader={ ({section}) => <Text>{ section.key }</Text> }
            sections={ data }
          />
        </View>
      ) : (
        <Results
          surveyTitle={ selectedResultSet.surveyTitle }
          results={ selectedResultSet.results }
          resultSetName={ selectedResultSet.Title }
          closeResults={ this.closeResults }
        />
      )}
      </View>
    );
  }

  displaySurveyResults(selectedResultSet) {
    this.setState({
      selectedResultSet,
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
