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


class SurveyAnalytics extends Component {
  constructor(props) {
    super();

    this.state = {
      surveys: []
    }
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

    return (
      <View>
        <Text>Select survey to see results:</Text>
        <FlatList
          data={ surveys }
          renderItem={ ({item}) =>
            <TouchableHighlight onPress={ () => console.log('press') }>
              <Text>{ item.Title }</Text>
            </TouchableHighlight>
          }
          keyExtractor={ (item, index) => index }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authorized.email
  };
};

export default connect(mapStateToProps)(SurveyAnalytics);
