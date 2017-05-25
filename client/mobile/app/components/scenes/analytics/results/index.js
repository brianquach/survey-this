'use strict';

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Text,
  View
} from 'react-native';
import { SurveyRestAPI } from '../../../../lib/rest-api';


class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: this.props.surveyQuestions,
      data: this.props.results,
      dataSetName: this.props.resultSetName
    };
  }

  render() {
    const {
      surveyTitle,
      closeResults,
    } = this.props;
    const headingMsg = `Results for ${surveyTitle}:`;
    const dataSetName = this.state.dataSetName;
    const data = this.state.data;

    return (
      <View>
        <Text>{ dataSetName }</Text>
        <Text>{ headingMsg }</Text>
        <FlatList
          data={ data }
          renderItem={ ({item}) => this.resultRenderItem(item) }
          keyExtractor={ (item, index) => index }
        />
        <Button
          onPress={ closeResults }
          title="Back"
          color="#841584"
          accessibilityLabel="Show survey result selection"
        />
      </View>
    );
  }

  resultRenderItem(result) {
    const total = result.Yes + result.No;
    const yesResult = `Yes: ${result.Yes / total * 100}%`;
    const noResult = `No: ${result.No / total * 100}%`;
    return (
      <View>
        <Text>{ result.question }</Text>
        <Text>{ yesResult }</Text>
        <Text>{ noResult }</Text>
      </View>
    )
  }
}

export default Results;
