'use strict';

import React, { Component } from 'react';
import {
  Button,
  ListView,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import SignOut from './signout';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/survey/bquach@umail.ucsb.edu/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((resp) => resp.json())
    .then((respJSON) => {
      const surveys = respJSON.Items;
      this.setState({
        dataSource: this.ds.cloneWithRows(surveys)
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }
  render() {
    const { dispatch } = this.props;
    const dataSource = this.state.dataSource;

    return (
      <View>
        <ListView
          dataSource={ dataSource }
          renderRow={ (rowData) => <Text>{ rowData.Title }</Text> }
        />
        <Button
          title="Create Survey"
          accessibilityLabel="Start creating your own survey"
          onPress={() => { console.log('create'); }} />
        <Button
          title="Run Survey"
          accessibilityLabel="Run a survey you have created"
          onPress={() => { console.log('run'); }} />
        <Button
          title="Analytics"
          accessibilityLabel="View analytical information of your surveys"
          onPress={() => { console.log('analytics'); }} />
        <SignOut />
      </View>
    );
  }
}

export default connect()(Dashboard);
