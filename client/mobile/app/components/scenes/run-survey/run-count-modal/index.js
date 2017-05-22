'use strict';

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';


class RunCountModal extends Component {
  state = {
    runCount: '1',
    resultSetName: ''
  }

  render() {
    const survey = this.props.survey;
    const isVisible = this.props.show;

    return (
      <View style={ { marginTop: 22 } }>
        <Modal
          animationType={ 'slide' }
          transparent={ false }
          visible={ isVisible }
          onRequestClose={ () => { alert('Modal has been closed.') } }
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>{ survey.Title }</Text>
            <Text>Save survey data set as:</Text>
            <TextInput
              style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
              onChangeText={ (resultSetName) => this.setState({ resultSetName }) }
              value={ this.state.resultSetName }
            />

            <Text>How many times do you want to run the survey?</Text>
            <TextInput
              style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
              onChangeText={ (runCount) => this.setState({ runCount }) }
              value={ this.state.runCount }
              keyboardType={ 'number-pad' }
            />

            <TouchableHighlight onPress={() => {
              this.run()
            }}>
              <Text>Run</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.close()
            }}>
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
      </View>
    );
  }

  close() {
    this.setModalVisible(false);
  }

  run() {
    const resultSetName = this.state.resultSetName;
    const runCount = this.state.runCount;
    this.props.onRun(resultSetName, runCount);
    this.setModalVisible(false);
  }

  setModalVisible(isVisible) {
    this.props.setModalVisible(isVisible);
  }
}

export default RunCountModal;
