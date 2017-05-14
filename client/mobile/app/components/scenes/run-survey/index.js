'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { SurveyRestAPI } from '../../../restful-api/survey';


class RunSurvey extends Component {
  constructor(props) {
    super();

    this.state = {
      surveys: []
    };
  }

  componentWillMount() {
    const params = {
      email: this.props.email
    };
    SurveyRestAPI.getSurveys(params, (surveys) => {
      this.setState({
        surveys: surveys
      });
    });
  }

  render() {
    const surveys = this.state.surveys;

    return (
      <View>
        <Text>Pick survey to run:</Text>
        <FlatList
          data={ surveys }
          renderItem={ ({item}) =>
            <Text style={{ lineHeight: 40 }}>
              { item.Title }
            </Text>
          }
          keyExtractor={ (item, index) => index } />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

export default connect(mapStateToProps)(RunSurvey);
