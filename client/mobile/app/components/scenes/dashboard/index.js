'use strict';

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { SurveyRestAPI } from '../../../lib/rest-api/survey'
import SignOut from './signout';


class Dashboard extends Component {
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
    const {
      goToCreateSurvey,
      goToRunSurvey
    } = this.props;
    const surveys = this.state.surveys;
    return (
      <View>
        <FlatList
          data={ surveys }
          renderItem={ ({item}) => <Text>{ item.Title }</Text> }
          keyExtractor={ (item, index) => index } />
        <Button
          title="Create Survey"
          accessibilityLabel="Start creating your own survey"
          onPress={ goToCreateSurvey } />
        <Button
          title="Run Survey"
          accessibilityLabel="Run a survey you have created"
          onPress={ goToRunSurvey } />
        <Button
          title="Analytics"
          accessibilityLabel="View analytical information of your surveys"
          onPress={() => { console.log('analytics'); }} />
        <SignOut />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.authorized.name,
    email: state.authorized.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToCreateSurvey: () => dispatch({ type: 'CREATE_SURVEY' }),
    goToRunSurvey: () => dispatch({ type: 'RUN_SURVEY' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
