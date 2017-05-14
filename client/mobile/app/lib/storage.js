'use strict';

import { AsyncStorage } from 'react-native';


module.exports.Storage = {};

exports.Storage.setItem = async (key, value) => {
  let storeObj = {
    type: 'string',
    value: value
  };
  try {
    if (typeof value !== 'string') {
      storeObj.type = 'object';
      storeObj.value = JSON.stringify(value);
    }
    value = JSON.stringify(storeObj);
    await AsyncStorage.setItem(key, value);
    console.log(`Saved key: ${key}, value ${value}`);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

exports.Storage.getItem = async (key) => {
  let value = null;
  try {
    let storeObj = await AsyncStorage.getItem(key);
    storeObj = JSON.parse(storeObj);
    if (storeObj.type === 'object') {
      value = JSON.parse(storeObj.value);
    } else {
      value = storeObj.value;
    }
    console.log(`Get value of ${key}`);
  } catch (error) {
    console.log(`Could not get value from key ${key}: ${error.message}`);
  }
  return value;
};

exports.Storage.removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Key ${key} removed from storage`);
  } catch (error) {
    console.log(`Error removing key ${key}: ${error.message}`);
  }
}
