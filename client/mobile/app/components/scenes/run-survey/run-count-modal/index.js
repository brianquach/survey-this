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
    runCount: '1'
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
            <Text>How many times do you want to run the survey?</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(runCount) => this.setState({runCount})}
              value={this.state.runCount}
              keyboardType={ 'number-pad' }
            />

            <TouchableHighlight onPress={() => {
              this.run()
            }}>
              <Text>Run</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
      </View>
    );
  }

  run() {
    this.props.onRun(this.state.runCount);
    this.setModalVisible(false);
  }

  setModalVisible(isVisible) {
    this.props.setModalVisible(isVisible);
  }
}

export default RunCountModal;
