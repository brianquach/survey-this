'use strict';

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import SignOut from './signout';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: []
    };
  }

  componentWillMount() {
    const creator = encodeURI(this.props.email);
    const url = `http://localhost:3000/survey/${creator}/all`;
    fetch(url, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
      }
    })
    .then((resp) => resp.json())
    .then((respJSON) => {
      const surveys = respJSON.Items;
      this.setState({
        surveys: surveys
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const { dispatch } = this.props;
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
          onPress={() => dispatch({ type: 'CREATE_SURVEY' }) } />
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

const mapStateToProps = (state) => {
  return {
    name: state.authorized.name,
    email: state.authorized.email
  };
};

export default connect(mapStateToProps)(Dashboard);
